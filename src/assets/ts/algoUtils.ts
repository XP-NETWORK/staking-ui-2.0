import algosdk from "algosdk";
import {
  algodApiKey,
  algodPort,
  algodUri,
  appAdress,
  assetIdx,
} from "./Consts";

import { Staking } from "./StakingClient";

// const appAddr = algosdk.getApplicationAddress(appAdress);

// // const getTransaction = async () => {
// //   const suggested = await algod.getTransactionParams().do();
// // };

// const transfer = async (from: string, amt: number) => {
//   algosdk.makeAssetTransferTxnWithSuggestedParams(
//     from,
//     appAddr, //to
//     undefined,
//     undefined,
//     amt,
//     undefined,
//     assetIdx,
//     await algod.getTransactionParams().do()
//   );
// };

const algod = new algosdk.Algodv2(algodApiKey, algodUri, algodPort);

const createClient = async(signer: any, account: string) => {
  console.log("signer,account",signer,account);
  
  const stakingContract = new Staking({
    client: algod,
    signer: async (txns) => {
      const s = txns.map((e) => {
        return {
          txn: Buffer.from(e.toByte()).toString("base64")
        }
      }); 
      const signed = await signer.AlgoSigner.signTxn(s)
      return signed.map((e: any) => Buffer.from(e.blob, "base64"))
    }, 
    sender: account, 
    appId: appAdress,
  });
  console.log(stakingContract);
  return stakingContract;
  
};

export { createClient };
