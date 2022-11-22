import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createClient } from "../../assets/ts/algoUtils";

import {
    setAccount,
    setClient,
    setSigner,
} from "../../store/reducer/homePageSlice";
import { appAdress3Months } from "../../assets/ts/Consts";
import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";

const WalletConnect = ({ connect }: { connect: Function }) => {
    let { to } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        let account = await connect("AlgoSigner");
        dispatch(setAccount(account.address));
        dispatch(setSigner(account.signer));
        let client = await createClient(
            account.signer,
            account.address,
            appAdress3Months
        );
        dispatch(setClient(client));
        to === "stake" ? navigate("/stake") : navigate("/rewards");
    };

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            WalletConnect
        </button>
    );
};

export default HigherEVM(WalletConnect);
