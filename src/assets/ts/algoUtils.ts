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
    INFT,
    subAppId,
} from "./Consts";
import axios from "axios";
import { Staking } from "./StakingClient";
import store from "../../store/store";
import moment from "moment";
import { Base64 } from "js-base64";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";

const apiKey = process.env.REACT_APP_API_TOKEN as string;
const algodToken = {
    "x-api-key": apiKey,
};
export const algod = new algosdk.Algodv2(algodToken, algodUri, algodPort);

const algoService = axios.create({
    baseURL: process.env.REACT_APP_ALGO_SERVICE,
});

export const getTokenStaked = async () => {
    let appIds = [
        appAdress3Months,
        appAdress6Months,
        appAdress9Months,
        appAdress12Months,
    ];
    // debugger;
    let arr = await Promise.allSettled(
        appIds.map((e: any) => {
            var config = {
                method: "get",
                url: `https://mainnet-algorand.api.purestake.io/idx2/v2/applications/${e}`,
                headers: {
                    "x-api-key": "kZWDAxYR7Y6S6RoyfGIi28SATZ5DfTIs5pF0UMW4",
                    Authorization:
                        "Bearer kZWDAxYR7Y6S6RoyfGIi28SATZ5DfTIs5pF0UMW4",
                },
            };
            return axios(config);
        })
    );
    let s: any = [];
    let staked = 0;
    arr.forEach((e: any) => {
        e.value.data.application.params["global-state"].forEach(
            (value: any) => {
                if (value.key === "ZHluYW1pY19hcHBfdmFsdWVfdW5pdGd0c3JvdQ==") {
                    const i = value.value.uint / 1e6;
                    staked = staked + i;
                    s.push(i);
                }
            }
        );
    });
    return staked;
};

export async function generateOptIntoAssetTxns(
    address: string
): Promise<SignerTransaction[]> {
    const suggestedParams = await algod.getTransactionParams().do();
    suggestedParams.fee = 1_000;
    suggestedParams.flatFee = true;
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        assetIndex: assetIdx,
        amount: 0,
        suggestedParams,
    });
    // const optInTxn2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
    //     {
    //         from: address,
    //         to: address,
    //         assetIndex: assetIdx,
    //         amount: 0,
    //         suggestedParams,
    //     }
    // );
    const multipleTxnGroups = [
        { txn: optInTxn, signers: [address] },
        // { txn: optInTxn2, signers: [address] },
    ];
    return multipleTxnGroups;
}

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
        return resp;
    } catch (error) {
        console.log(error);
    }
};

export const optInt = async (stakingClient: any) => {
    debugger;
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
    debugger;
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

// export const getAllAccountData = async (owner: string) => {
//     const stakes = await getAllAlgoStakes(owner);
//     getAllNFTsByOwner(owner, stakes);
// };

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
                return obj;
            });
        }
    } catch (error) {
        console.log(error);
    }
    const arr = parseArray(allStakes);
    return arr;
};

export const getAllNFTsByOwner = async (
    address: string,
    stakes: IFetchedStake[]
) => {
    try {
        const response = await algoService.get(
            `/get-nfts-status-by-address/${address}`
        );
        const parsed = await parse(response.data);
        const arr = findNotExist(parsed, stakes);
        return arr;
    } catch (error) {
        console.log(error);
    }
};

const findNotExist = (nfts: INFT[], stakes: IFetchedStake[]) => {
    const filteredNfts = nfts.filter((nft: INFT) => {
        const unstakedTxId = stakes.find((stake: IFetchedStake) => {
            return stake.txId === nft.txId;
        });
        return unstakedTxId ? nft : undefined;
    });
    return filteredNfts;
};

const parse = async (nfts: any[]) => {
    const allSettled = await Promise.allSettled(
        nfts.map((e: INFT) => axios.get(e.Uri))
    );
    const parsed = allSettled.map((e: any) => {
        const relatedNft = nfts.find(
            (nft: INFT) => nft.Uri === e.value.config.url
        );
        relatedNft.Uri = e.value.data;
        return relatedNft;
    });
    return parsed;
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

export const getAPY = (rewards: any | undefined) => {
    const appId = rewards?.appid;
    switch (true) {
        case appAdress3Months === appId:
            return "25";
        case appAdress6Months === appId:
            return "50";
        case appAdress9Months === appId:
            return "75";
        case appAdress12Months === appId:
            return "100";
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
    // debugger;
    period = period?.toString();
    const startDate = getStartDate(date);
    let expDate: any;
    if (period === "7890000") {
        expDate = moment(startDate).add(3, "month").format("YYYY-MM-DD hh:mm");
    } else if (period === "15780000") {
        expDate = moment(startDate).add(6, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "23650000") {
        expDate = moment(startDate).add(9, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "31540000") {
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
            if (assetInfo.message) {
                console.log(assetInfo.message);
                return 0;
            } else return assetInfo["asset-holding"]["amount"];
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

export const checkIfOpIn = async (assetId: number, owner: string) => {
    let isOptIn: any;
    try {
        isOptIn = await algod.accountAssetInformation(owner, assetId).do();
        if (isOptIn.message === "account asset info not found") return false;
        else return isOptIn;
    } catch (error) {
        return false;
    }
};

export const optInAsset = async (
    owner: string,
    assetId: number,
    signer: any,
    client: any
) => {
    try {
        let params = await client.client.getTransactionParams().do();
        params.fee = 7_000;
        params.flatFee = true;
        const optInTxn =
            await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: owner,
                to: owner,
                amount: 0,
                assetIndex: assetId,
                suggestedParams: params,
            });
        const encodedTx = Base64.fromUint8Array(optInTxn.toByte());
        const signedTx =
            (await signer.signTxn([{ txn: encodedTx }])) ||
            signer.signTransaction([{ txn: encodedTx }]);
        const res = await signer.send({
            ledger: "MainNet",
            tx: signedTx[0].blob,
        });
        await waitTxnConfirm(res.txId);
        return res.txId;
    } catch (error) {
        console.log(error);
    }
};

const waitTxnConfirm = async (txId: any) => {
    const status = await algod.status().do();
    let lastRound = status["last-round"];
    algod.pendingTransactionsInformation();
    let pendingInfo: any = await algod
        .pendingTransactionInformation(txId)
        .do()
        .catch(() => ({}));
    while (
        !(pendingInfo["confirmed-round"] && pendingInfo["confirmed-round"] > 0)
    ) {
        lastRound += 1;
        await algod.statusAfterBlock(lastRound).do();
        pendingInfo = await algod.pendingTransactionInformation(txId).do();
    }
};

export const transferOptedInAsset = async (
    assetId: number,
    address: string
) => {
    debugger;
    try {
        const res = await algoService.post("/transfer-asset", {
            assetId,
            address,
        });
        if (res.data) return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const claimRewards = async (
    signer: any,
    account: string,
    stakes: IFetchedStake[],
    index: number
) => {
    const client = await createClient(
        signer,
        account,
        getMonths(stakes[index]?.lockTime)
    );
    let rewards;
    // debugger;
    try {
        let sp = await client.getSuggestedParams();
        sp.flatFee = true;
        sp.fee = 7_000;
        let token = BigInt(assetIdx);
        let lockTime = BigInt(stakes[index]?.lockTime);
        let app = subAppId;
        rewards = await client.getReward(
            {
                token,
                lockTime,
                app,
            },
            { suggestedParams: sp }
        );
        return rewards;
    } catch (e) {
        console.log(e);
    }
};

export const unstakeTokens = async (
    signer: {},
    account: string,
    stakes: IFetchedStake[],
    index: number
) => {
    let ustaked;
    const client = await createClient(
        signer,
        account,
        getMonths(stakes[index]?.lockTime)
    );
    try {
        let sp = await client.getSuggestedParams();
        sp.flatFee = true;
        sp.fee = 7_000;

        ustaked = await client.unstake(
            {
                stakeId: BigInt(0),
                token: BigInt(assetIdx),
                app: subAppId,
            },
            { suggestedParams: sp }
        );
        return ustaked;
    } catch (e) {
        console.log(e);
    }
};

// export const getArrayOfImages = () => {
//     const array = new Array(101).fill(
//         (e: any, i: number) =>
//             `https://nft-service-testing.s3.eu-west-1.amazonaws.com/${i}.png`
//     );

//     console.log(array);
// };

// export const getNFTCollection = async (i: number) => {
//     const arr = [];
//     for (let index = i; index < i + 15; index++) {
//         const element = axios.get(
//             `https://nft-service-testing.s3.eu-west-1.amazonaws.com/${index}.json`
//         );
//         arr.push(element);
//     }
//     const settled = await Promise.allSettled(arr);
//     const nfts = settled.map((e: any) => e.value.data);
//     return nfts;
// };

export const getNFTCollection = async (i: number) => {
    const arr = [];
    for (let index = 1; index < 101; index++) {
        const element = axios.get(
            `https://nft-service-testing.s3.eu-west-1.amazonaws.com/${index}.json`
        );
        arr.push(element);
    }
    const settled = await Promise.allSettled(arr);
    const nfts = settled.map((e: any) => e.value.data);
    return nfts;
};

export const getTotalStaked = async () => {
    let appIds = [
        appAdress3Months,
        appAdress6Months,
        appAdress9Months,
        appAdress12Months,
    ];
    const promises = appIds.map((id: any) => {
        var config = {
            method: "get",
            url: "https://mainnet-algorand.api.purestake.io/idx2/v2/applications/970373105",
            headers: {
                "x-api-key": apiKey,
            },
        };
        return axios(config);
    });

    const settled = await Promise.allSettled(promises);
    let totalStaked = 0;
    settled.forEach((element: any) => {
        element.value.data.application.params["global-state"].forEach(
            (key: any) => {
                if (key.key === "ZHluYW1pY19hcHBfdmFsdWVfdW5pdGd0c3JvdQ==") {
                    totalStaked = totalStaked + key.value.uint / 1e6;
                }
            }
        );
    });
    return totalStaked;
};
getTotalStaked();
