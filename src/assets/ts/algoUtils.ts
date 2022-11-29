import algosdk from "algosdk";
import {
    AlgoDetails,
    algodPort,
    algodUri,
    appAdress12Months,
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    assetIdx,
    IFetchedStake,
    subAppId,
} from "./Consts";
import axios from "axios";
import { Staking } from "./StakingClient";
import store from "../../store/store";
import moment from "moment";
import { updateNFTUriToFetchedStakes } from "../../store/reducer/homePageSlice";
const apiKey = process.env.REACT_APP_API_TOKEN?.toString();
export const algod = new algosdk.Algodv2(apiKey as string, algodUri, algodPort);

const algoService = axios.create({
    baseURL: process.env.REACT_APP_ALGO_SERVICE,
    timeout: 10000,
    headers: {
        crossDomain: true,
    },
});

export const createClient = async (
    signer: any,
    account: string,
    duration: any
) => {
    // debugger;
    const { connectedWallet } = store.getState().homePage;

    const algoDetails = new AlgoDetails(duration);

    const stakingContract = new Staking({
        client: algod,
        signer: async (txns) => {
            const s = txns?.map((e) => {
                return {
                    txn: Buffer.from(e.toByte()).toString("base64"),
                };
            });
            let signed: any;
            switch (connectedWallet) {
                case "AlgoSigner":
                    signed = await signer.signTxn(s);
                    return signed?.map((e: any) =>
                        Buffer.from(e.blob, "base64")
                    );
                case "MyAlgo":
                    signed = await signer.signTxns(s);
                    return signed?.map((e: any) => Buffer.from(e, "base64"));
                case "Pera":
                    const multipleTxnGroups = txns.map((n) => {
                        return { txn: n, signers: [account] };
                    });

                    signed = await signer.signTransaction([multipleTxnGroups]);
                    return signed?.map((e: any) => Buffer.from(e, "base64"));
                default:
                    break;
            }
        },
        sender: account,
        appId: algoDetails.appId,
    });
    return stakingContract;
};

export const stake = async (
    address: string,
    amount: number,
    stakingClient: any,
    algoDetails: any
) => {
    debugger;
    const axfer: any = algosdk.makeAssetTransferTxnWithSuggestedParams(
        address,
        algosdk.getApplicationAddress(stakingClient.appId),
        undefined,
        undefined,
        amount,
        undefined,
        assetIdx as any,
        await algod.getTransactionParams().do()
    );
    try {
        const resp = await stakingClient.stake({
            axfer: axfer,
            lockTime_: algoDetails.duration,
        });
        console.log({ resp });
        return resp;
    } catch (error) {
        console.log(error);
    }
};

export const optInt = async (stakingClient: any) => {
    try {
        const resp = await stakingClient.optIn();
        return resp;
    } catch (error) {
        console.log(error);
    }
};

export const unstake = async (
    signer: any,
    account: string,
    duration: number
) => {
    let rewards;
    const client = await createClient(signer, account, getMonths(duration));
    try {
        let sp = await client.getSuggestedParams();
        sp.flatFee = true;
        sp.fee = 7_000;

        rewards = await client.unstake(
            {
                stakeId: BigInt(0),
                token: BigInt(assetIdx),
                app: subAppId,
            },
            { suggestedParams: sp }
        );
        console.log(rewards);
    } catch (e) {
        console.log(e);
    }
};

export const createClients = async (signer: any, account: string) => {
    // console.log("signer,account create clintsssss", signer, account);
    let clients = [
        await createClient(signer, account, 3),
        await createClient(signer, account, 6),
        await createClient(signer, account, 9),
        await createClient(signer, account, 12),
    ];
    return clients;
};

export const getAlgoReward = async (owner: string) => {
    let appIds = [
        appAdress3Months,
        appAdress6Months,
        appAdress9Months,
        appAdress12Months,
    ];

    let promises: any = [];
    let rewards: any = [];
    // for (let appId of appIds) {
    //     const promise = algoService.get(`/earned/${appId}/${owner}`);
    //     promises.push(promise);
    // }
    try {
        const res = await Promise.allSettled(
            appIds.map((item) => algoService.get(`/earned/${item}/${owner}`))
        );
        if (res) {
            rewards = res.map((e: any, i) => {
                let obj: any;
                if (e.status !== "rejected") {
                    obj = {
                        earned: e.value.data.data.earned / 1e6,
                        appid: e.value.data.data.appId,
                    };
                }
                return obj;
            });
        }
    } catch (error) {
        console.log(error);
    }
    return rewards;
};

export const getAllAlgoStakes = async (owner: string) => {
    let appIds = [
        appAdress3Months,
        appAdress6Months,
        appAdress9Months,
        appAdress12Months,
    ];

    let allStakes: any = [];
    try {
        const res = await Promise.allSettled(
            appIds.map((item) =>
                algoService.get(`/get-all-stakings/${item}/${owner}`)
            )
        );
        if (res) {
            allStakes = res.map((e: any, i) => {
                let obj: any;

                if (e.status !== "rejected") {
                    obj = {
                        ...e.value.data.data,
                    };
                }
                console.log({ obj });
                if (obj) return obj;
            });
        }
    } catch (error) {
        console.log(error);
    }
    const arr = parseArray(allStakes);
    console.log({ arr });

    return arr;
};

export const getAllNFTsByOwner = async (
    address: string,
    stakes: IFetchedStake[]
) => {
    await algoService
        .get(`/get-nfts-status-by-address/${address}`)
        .then(function (response) {
            let arr: any = [];
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                axios.get(element.uri).then(function (response) {
                    const nftToRelate = {
                        uri: { ...element },
                        txId: element.txId,
                        displayImage: response.data.image,
                    };
                    store.dispatch(updateNFTUriToFetchedStakes(nftToRelate));
                });
                arr.push(element);
            }
            // console.log({ arr });
        })
        .catch(function (error) {
            console.log(error);
        });
};

const parseArray = (array: []) => {
    // debugger;
    let newArr: any = [];
    for (let index = 0; index < array.length; index++) {
        let element: [];
        element = array[index];
        if (element && Object.keys(element).length > 0) {
            const withNestedKeys = Object.values(element);
            for (let index = 0; index < withNestedKeys.length; index++) {
                const obj = withNestedKeys[index];
                newArr.push(obj);
            }
        }
    }
    return newArr;
};

export const getAPY = (appId: string | undefined) => {
    switch (appId) {
        case appAdress3Months.toString():
            return "45";
        case appAdress6Months.toString():
            return "75";
        case appAdress9Months.toString():
            return "100";
        case appAdress12Months.toString():
            return "125";
        default:
            break;
    }
};

const getStartDate = (date: string) => {
    const seconds = parseInt(date);
    const startDate = moment.unix(seconds).format("YYYY-MM-DD HH:MM");
    return startDate;
};

export const getAlgoStakeEndDate = (period: string, date: string) => {
    period = period.toString();
    const startDate = getStartDate(date);
    let expDate: any;
    if (period === "7890000") {
        expDate = moment(startDate).add(3, "month").format("YYYY-MM-DD hh:mm");
    } else if (period === "15780000") {
        expDate = moment(startDate).add(6, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "23650000") {
        expDate = moment(startDate).add(9, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "31536000") {
        expDate = moment(startDate).add(1, "year").format("YYYY-MM-DD HH:MM");
    }
    return expDate;
};

export const getRemainedDays = (duration: number, start: number) => {
    const today = moment().unix();
    const days = Math.round(
        duration / 60 / 60 / 24 - (today - start) / 60 / 60 / 24
    );
    return days;
};

export const getAlgoStakeProgress = (duration: number, start: number) => {
    const dayNow = Math.floor(Date.now() / 1000);
    const daysDuration = duration;
    const daysPassed = dayNow - start;
    return (daysPassed / daysDuration) * 100;
};

export const checkOptInApps = async (client: any) => {
    try {
        const _accountInformation = await client.client
            .accountInformation(client.sender)
            .do();
        return _accountInformation;
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getXpNetBalance = async (client: any) => {
    try {
        if (client.sender !== "") {
            const assetInfo = await client.client
                .accountAssetInformation(client.sender, assetIdx)
                .do();
            return assetInfo["asset-holding"]["amount"];
        }
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getMonths = (duration: number) => {
    switch (duration) {
        case 31536000:
            return 12;
        case 23650000:
            return 9;
        case 15780000:
            return 6;
        default:
            return 3;
    }
};
