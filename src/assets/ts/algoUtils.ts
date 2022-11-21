import algosdk from "algosdk";
import { algodApiKey, algodPort, algodUri, assetIdx } from "./Consts";

import { calculateDurationTime, getAppDetails } from "./helpers";
import { Staking } from "./StakingClient";
import store from "../../store/store";
const apiKey = process.env.REACT_APP_API_TOKEN?.toString();
export const algod = new algosdk.Algodv2(apiKey as string, algodUri, algodPort);
// algod.accountInformation()
export const createClient = async (
    signer: any,
    account: string,
    duration: any
) => {
    // debugger;
    const { connectedWallet } = store.getState().homePage;

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
        appId: getAppDetails(duration).id,
    });
    return stakingContract;
};

export const stake = async (
    address: string,
    amount: number,
    duration: number,
    stakingClient: any
) => {
    console.log("Stake enter!");

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
            lockTime_: getAppDetails(duration).duration,
        });
        console.log("Stake succeed: ", resp);
    } catch (error) {
        console.log(error);
    }
};

export const optInt = async (stakingClient: any) => {
    await stakingClient.optIn();
};

export const unstake = async (
    address: string,
    amount: number,
    duration: number,
    stakingClient: any
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
        lockTime_: getAppDetails(duration).duration,
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
