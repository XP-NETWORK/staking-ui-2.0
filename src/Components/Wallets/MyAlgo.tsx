import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/MyAlgo.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import { algod, createClient } from "../../assets/ts/algoUtils";
import algosdk, { SuggestedParams } from "algosdk";
import { Base64 } from "js-base64";
import { appAdress3Months } from "../../assets/ts/Consts";
import {
    setAccount,
    setClient,
    setConnectedWallet,
    setConnectModalShow,
    setSigner,
} from "../../store/reducer/homePageSlice";

interface Props {
    connect: Function;
}

type TxResp = {
    txId: string;
};

type SignedTxn = {
    txID?: string;
    blob: string;
};

type Ledger = "MainNet" | "TestNet" | "any";

type BrowserSigner = {
    accounts(args: { ledger: Ledger }): Promise<{ address: string }[]>;
    signTxn(transactions: { txn: string }[]): Promise<SignedTxn[]>;
    send(info: { ledger: Ledger; tx: string }): Promise<TxResp>;
};

export type AlgoSignerH = {
    readonly algoSigner: BrowserSigner;
    readonly address: string;
    readonly ledger: Ledger;
};

/**
 * This library is written in typescript.
 * unfortunately the browser extension injects the AlgoSigner in a way we can't get a typed object wwithout this hack.
 *
 * @return Strongly typed AlgoSigner from extension
 */
export function typedAlgoSigner(): BrowserSigner {
    //@ts-expect-error why do you inject libraries like this :|
    if (typeof AlgoSigner === "undefined") {
        throw Error("algosigner not available!");
    }

    //@ts-expect-error why do you inject libraries like this :|
    return AlgoSigner;
}

function algoSignerWrapper(
    algod: algosdk.Algodv2,
    acc: algosdk.Account
): AlgoSignerH {
    const signer: BrowserSigner = {
        accounts(_) {
            return Promise.resolve([
                {
                    address: acc.addr,
                },
            ]);
        },
        signTxn(txns) {
            return Promise.resolve(
                txns.map((t) => {
                    const signed = algosdk.signTransaction(
                        algosdk.decodeUnsignedTransaction(
                            Base64.toUint8Array(t.txn)
                        ),
                        acc.sk
                    );
                    return {
                        txID: signed.txID,
                        blob: Base64.fromUint8Array(signed.blob),
                    };
                })
            );
        },
        send({ tx }) {
            return algod.sendRawTransaction(Base64.toUint8Array(tx)).do();
        },
    };

    return {
        algoSigner: signer,
        address: acc.addr,
        ledger: "any",
    };
}

const MyAlgo = ({ connect }: Props) => {
    const { navigateRoute, mobile } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        // debugger;
        let account = await connect("MyAlgo");
        dispatch(setAccount(account.address));
        dispatch(setSigner(account.signer));
        let client = await createClient(
            account.signer,
            account.address,
            appAdress3Months
        );
        // console.log({ algosdk });

        // const s = algoSignerWrapper(algod, algosdk)
        dispatch(setClient(client));
        navigate(navigateRoute);
        dispatch(setConnectedWallet("MyAlgo"));
        dispatch(setConnectModalShow(false));
    };
    return (
        <button
            style={{ display: mobile ? "none" : "auto" }}
            onClick={handleClick}
            className="connectBtn"
        >
            <img src={icon} alt="" />
            MyAlgo
        </button>
    );
};

export default HigherALGO(MyAlgo);
