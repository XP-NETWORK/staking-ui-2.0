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
    EVMStakeContract,
} from "./Consts";
import axios from "axios";
import { Staking } from "./StakingClient";
import store from "../../store/store";
import moment from "moment";
const apiKey = process.env.REACT_APP_API_TOKEN?.toString();
export const algod = new algosdk.Algodv2(apiKey as string, algodUri, algodPort);

const algoService = axios.create({
    baseURL: process.env.REACT_APP_ALGO_SERVICE,
    timeout: 10000,
    headers: {},
});

export const createClient = async (
    signer: any,
    account: string,
    duration: any
) => {
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
    // debugger;
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
    address: string,
    amount: number,
    duration: number,
    stakingClient: any,
    algoDetails: any
) => {
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
    await stakingClient.stake({
        axfer: axfer,
        lockTime_: algoDetails.duration,
    });
};

export const claimXPNET = async () => {};

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

const getRewardsForSingleAppId = (appId: number, owner: string) => {
    return new Promise((resolve: any, reject: any) => {
        algoService.get(`/earned/${appId}/${owner}`);
        // .then((response) => {
        //     return resolve(response.data);
        // })
        // .catch((error) => {
        //     return reject(error.message);
        // });
    });
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
    for (let appId of appIds) {
        const promise = algoService.get(`/earned/${appId}/${owner}`);
        promises.push(promise);
    }
    try {
        const res = await Promise.allSettled(
            appIds.map((item) => algoService.get(`/earned/${item}/${owner}`))
        );
        if (res) {
            rewards = res.map((e: any, i) => {
                let obj: any;
                if (e.status === "rejected") {
                    obj = {
                        status: e.status,
                        reason: e.reason.message,
                    };
                } else
                    obj = {
                        earned: e.value.data.data.earned / 1e6,
                        appid: e.value.data.data.appId,
                    };
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
                if (e.status === "rejected") {
                    obj = {
                        status: e.status,
                        reason: e.reason.message,
                    };
                } else
                    obj = {
                        ...e.value.data.data,
                    };
                return obj;
            });
        }
    } catch (error) {
        console.log(error);
    }
    const arr = parseArray(allStakes);
    return arr;
};

const parseArray = (array: []) => {
    let newArr: any = [];
    for (let index = 0; index < array.length; index++) {
        let element: [];
        element = array[index];
        if (Object.keys(element).length > 0) {
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
    console.log({ appId });

    switch (appId) {
        case "952936663":
            return "45";
        case "952936944":
            return "75";
        case "952937171":
            return "100";
        case "952937415":
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
