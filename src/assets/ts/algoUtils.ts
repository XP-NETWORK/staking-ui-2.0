import algosdk from "algosdk";
import { algodApiKey, algodPort, algodUri, assetIdx } from "./Consts";
import { calculateDurationTime, getAppDetails } from "./helpers";
import { Staking } from "./StakingClient";
import store from "../../store/store";
export const algod = new algosdk.Algodv2(algodApiKey, algodUri, algodPort);

export const createClient = async (
  signer: any,
  account: string,
  duration: any
) => {
  // debugger;
  const { connectedWallet } = store.getState().homePage;
  console.log({ connectedWallet });

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
          return signed?.map((e: any) => Buffer.from(e.blob, "base64"));
        case "MyAlgo":
          signed = await signer.signTxns(s);
          return signed?.map((e: any) => Buffer.from(e, "base64"));
        case "Pera":
          signed = await signer.signTransaction(s);
          return signed?.map((e: any) => Buffer.from(e.blob, "base64"));
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
  // console.log(
  //   "paramns",
  //   { address },
  //   { amount },
  //   { duration },
  //   { stakingClient }
  // );
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
  console.log("alex: ", axfer);

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
  // console.log(
  //   "paramns",
  //   { address },
  //   { amount },
  //   { duration },
  //   { stakingClient }
  // );

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
  //console.log(axfer);

  let staking = await stakingClient.stake({
    axfer: axfer,
    lockTime_: getAppDetails(duration).duration,
  });
  // console.log(staking);
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

// {
//   "name": "Transaction",
//   "tag": {
//       "type": "Buffer",
//       "data": [
//           84,
//           88
//       ]
//   },
//   "type": "axfer",
//   "from": {
//       "publicKey": {
//           "0": 249,
//           "1": 114,
//           "2": 161,
//           "3": 14,
//           "4": 6,
//           "5": 100,
//           "6": 218,
//           "7": 67,
//           "8": 31,
//           "9": 110,
//           "10": 226,
//           "11": 252,
//           "12": 89,
//           "13": 36,
//           "14": 253,
//           "15": 120,
//           "16": 205,
//           "17": 44,
//           "18": 132,
//           "19": 51,
//           "20": 105,
//           "21": 19,
//           "22": 105,
//           "23": 85,
//           "24": 166,
//           "25": 162,
//           "26": 81,
//           "27": 47,
//           "28": 5,
//           "29": 177,
//           "30": 90,
//           "31": 192
//       },
//       "checksum": {
//           "0": 41,
//           "1": 117,
//           "2": 7,
//           "3": 140
//       }
//   },
//   "to": {
//       "publicKey": {
//           "0": 253,
//           "1": 91,
//           "2": 207,
//           "3": 251,
//           "4": 107,
//           "5": 165,
//           "6": 46,
//           "7": 97,
//           "8": 179,
//           "9": 31,
//           "10": 75,
//           "11": 141,
//           "12": 68,
//           "13": 13,
//           "14": 14,
//           "15": 0,
//           "16": 25,
//           "17": 131,
//           "18": 232,
//           "19": 157,
//           "20": 18,
//           "21": 111,
//           "22": 190,
//           "23": 52,
//           "24": 37,
//           "25": 170,
//           "26": 120,
//           "27": 116,
//           "28": 12,
//           "29": 234,
//           "30": 147,
//           "31": 48
//       },
//       "checksum": {
//           "0": 51,
//           "1": 97,
//           "2": 203,
//           "3": 217
//       }
//   },
//   "amount": 15,
//   "assetIndex": 123148231,
//   "note": {},
//   "flatFee": false,
//   "genesisHash": {
//       "type": "Buffer",
//       "data": [
//           72,
//           99,
//           181,
//           24,
//           164,
//           179,
//           200,
//           78,
//           200,
//           16,
//           242,
//           45,
//           79,
//           16,
//           129,
//           203,
//           15,
//           113,
//           240,
//           89,
//           167,
//           172,
//           32,
//           222,
//           198,
//           47,
//           127,
//           112,
//           229,
//           9,
//           58,
//           34
//       ]
//   },
//   "fee": 1000,
//   "firstRound": 25659042,
//   "lastRound": 25660042,
//   "genesisID": "testnet-v1.0",
//   "appArgs": [],
//   "lease": {},
//   "group": {
//       "type": "Buffer",
//       "data": [
//           94,
//           26,
//           78,
//           19,
//           122,
//           219,
//           79,
//           206,
//           115,
//           90,
//           165,
//           70,
//           105,
//           42,
//           136,
//           72,
//           5,
//           253,
//           188,
//           135,
//           67,
//           160,
//           30,
//           209,
//           8,
//           114,
//           65,
//           142,
//           216,
//           205,
//           221,
//           9
//       ]
//   }
// }
