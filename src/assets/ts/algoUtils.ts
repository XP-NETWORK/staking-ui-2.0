import algosdk from "algosdk";
import { algodApiKey, algodPort, algodUri, assetIdx } from "./Consts";
import { calculateDurationTime, getAppDetails } from "./helpers";
import { Staking } from "./StakingClient";
export const algod = new algosdk.Algodv2(algodApiKey, algodUri, algodPort);

export const createClient = async (
    signer: any,
    account: string,
    duration: any,
    wallet: string
) => {
    console.log("signer,account,wallet", signer, account);
    // debugger;

    const stakingContract = new Staking({
        client: algod,
        signer: async (txns) => {
            const s = txns.map((e) => {
                return {
                    txn: Buffer.from(e.toByte()).toString("base64"),
                };
            });
            const signed =
                (await signer.signTxn(s)) || (await signer.signTransaction(s));
            return signed.map((e: any) => Buffer.from(e.blob, "base64"));
        },
        sender: account,
        appId: getAppDetails(duration).id,
    });
    console.log(stakingContract);
    return stakingContract;
};

export const stake = async (
    address: string,
    amount: number,
    duration: number,
    stakingClient: any
) => {
    console.log(
        "paramns",
        { address },
        { amount },
        { duration },
        { stakingClient }
    );

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
    console.log(axfer);

    let staking = await stakingClient.stake({
        axfer: axfer,
        lockTime_: getAppDetails(duration).duration,
    });
    console.log(staking);
};

export const unstake = async (
    address: string,
    amount: number,
    duration: number,
    stakingClient: any
) => {
    console.log(
        "paramns",
        { address },
        { amount },
        { duration },
        { stakingClient }
    );

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
    console.log(axfer);

    let staking = await stakingClient.stake({
        axfer: axfer,
        lockTime_: getAppDetails(duration).duration,
    });
    console.log(staking);
};

export const claimXPNET = async () => {};

export const createClients = async (
    signer: any,
    account: string,
    wallet: string
) => {
    console.log("signer,account create clintsssss", signer, account);
    let clients = [
        await createClient(signer, account, 3, wallet),
        await createClient(signer, account, 6, wallet),
        await createClient(signer, account, 9, wallet),
        await createClient(signer, account, 12, wallet),
    ];
    return clients;
};

// export const rewardPool = async (signer: any, address: string,stakingClient:any,amount:number) => {
//   const axfer: any = algosdk.makeAssetTransferTxnWithSuggestedParams(
//     address,
//     algosdk.getApplicationAddress(stakingClient.appId),
//     undefined,
//     undefined,
//     amount,
//     undefined,
//     assetIdx as any,
//     await algod.getTransactionParams().do()
//   );
// };
