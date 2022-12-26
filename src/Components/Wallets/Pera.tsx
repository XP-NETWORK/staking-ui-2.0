import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { PeraWalletConnect } from "@perawallet/connect";
import { useNavigate, useParams } from "react-router";
import {
    setAccount,
    setClient,
    setConnectedWallet,
    setPeraConnection,
    setSigner,
} from "../../store/reducer/homePageSlice";
import { useDispatch } from "react-redux";
import { appAdress3Months } from "../../assets/ts/Consts";
import { createClient } from "../../assets/ts/algoUtils";

interface Props {
    styles: () => Object;
    connect: Function;
}

const Pera = ({ styles, connect }: Props) => {
    const { navigateRoute } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const peraWallet = useMemo(() => {
        const wallet = new PeraWalletConnect({
            bridge: "https://bridge.walletconnect.org",
            network: "mainnet",
        });
        return wallet;
    }, []);

    const connectPeraWallet = async () => {
        peraWallet
            .connect()
            .then((newAccounts) => {
                // peraWallet.connector?.on("disconnect", () => {
                //     console.log("Disconnect");
                // });
                dispatch(setConnectedWallet("Pera"));
                dispatch(setAccount(newAccounts[0]));
                dispatch(setSigner(peraWallet));
                dispatch(setPeraConnection(false));
                getClient();
                navigate(navigateRoute);
            })
            .catch((reason: any) => {
                if (reason.message === "Connect modal is closed by user")
                    return false;
            });
    };

    const account = useSelector((state: ReduxState) => state.homePage.account);
    const signer = useSelector((state: ReduxState) => state.homePage.account);

    const peraConnection = useSelector(
        (state: ReduxState) => state.homePage.peraConnection
    );

    const getClient = useCallback(async () => {
        let client = await createClient(signer, account, appAdress3Months);
        dispatch(setClient(client));
    }, [account, dispatch, signer]);

    // useEffect(() => {
    //     peraWallet
    //         .reconnectSession()
    //         .then((accounts) => {
    //             peraWallet?.connector?.on("disconnect", () => {});

    //             if (accounts.length) {
    //             }
    //         })
    //         .catch((e) => console.log(e));

    //     return () => {
    //         peraWallet.disconnect();
    //     };
    // }, [peraConnection, peraWallet]);

    const handleClick = async () => {
        connectPeraWallet();
    };

    return (
        <button
            style={styles()}
            onClick={() => handleClick()}
            className="connectBtn"
        >
            <img src={icon} alt="" />
            Pera
        </button>
    );
};

export default HigherALGO(Pera);
