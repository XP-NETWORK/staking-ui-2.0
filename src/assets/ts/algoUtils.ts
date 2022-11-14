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
    signer: signer, // Put your signer here,
    sender: account, // Put sender address here
    appId: appAdress,
  });
  console.log(stakingContract);
  return stakingContract;
  
};

export { createClient };
