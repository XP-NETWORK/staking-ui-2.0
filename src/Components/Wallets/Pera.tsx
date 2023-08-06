import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { PeraWalletConnect } from "@perawallet/connect";
import { useNavigate } from "react-router";
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
// type AlgorandChainIDs = 416001 | 416002 | 416003 | 4160;
// type PeraWalletNetwork = "dev" | "testnet" | "mainnet";
// interface PeraWalletConnectOptions {
//     shouldShowSignTxnToast?: boolean;
//     network?: PeraWalletNetwork;
//     chainId?: AlgorandChainIDs;
// }

const Pera = ({ styles }: Props) => {
    const { navigateRoute } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const peraWallet = useMemo(() => {
        const wallet = new PeraWalletConnect({
            chainId: 416001,
            shouldShowSignTxnToast: false,
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

    const getClient = useCallback(async () => {
        const client = await createClient(signer, account, appAdress3Months);
        dispatch(setClient(client));
    }, [account, dispatch, signer]);

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
