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
const apiKey = process.env.REACT_APP_API_TOKEN?.toString();
export const algod = new algosdk.Algodv2(apiKey as string, algodUri, algodPort);

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

export const getAlgoRewards = async (owner: string) => {
    let appIds = [
        appAdress3Months,
        appAdress6Months,
        appAdress9Months,
        appAdress12Months,
    ];
    let rewards: any = [];
    const resp = await axios.get(
        `http://65.109.38.98:5000/earned/${952936663}/${owner}`
    );
    // appIds.forEach(async (e: any) => {
    //     try {
    //         const resp = await axios.get(
    //             `http://65.109.38.98:5000/earned/${e}/${owner}`
    //         );
    //         const rewards = resp.data;
    //         rewards.push(rewards);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    console.log({ resp });
};
