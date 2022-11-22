import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createClient } from "../../assets/ts/algoUtils";

import {
    setAccount,
    setClient,
    setEvmAccount,
    setSigner,
} from "../../store/reducer/homePageSlice";
import { appAdress3Months } from "../../assets/ts/Consts";
import icon from "../../assets/wallets/MetaMask.svg";
import { HigherEVM } from "./HigherEVM";

const MetaMask = ({ connect }: { connect: Function }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        const response = await connect("MetaMask");
        dispatch(setEvmAccount(response.accounts[0]));
        if (response.stakes > 0) {
            navigate("/evm-rewards");
        } else {
            navigate("/error");
        }
    };

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            MetaMask
        </button>
    );
};

export default HigherEVM(MetaMask);
