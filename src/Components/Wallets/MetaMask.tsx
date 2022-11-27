import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import {
    setBlockchain,
    setEvmAccount,
    setEvmStakes,
} from "../../store/reducer/homePageSlice";
import icon from "../../assets/wallets/MetaMask.svg";
import { HigherEVM } from "./HigherEVM";
import { BLOCKCHAINS } from "../../assets/ts/Consts";

const MetaMask = ({ connect }: { connect: Function }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        const response = await connect("MetaMask");

        dispatch(setEvmAccount(response.accounts[0]));
        dispatch(setEvmStakes(Number(response.stakes)));
        if (Number(response.stakes) > 0) {
            dispatch(setBlockchain(BLOCKCHAINS[1]));
            navigate("/rewards");
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
