import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { HigherALGO } from "./HigherALGO";
import { createClient } from "../../assets/ts/algoUtils";

import {
    setAccount,
    setClient,
    setConnectModalShow,
    setSigner,
} from "../../store/reducer/homePageSlice";
import { appAdress3Months } from "../../assets/ts/Consts";
import icon from "../../assets/wallets/AlgoSigner.png";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {
    connect: Function;
}

const AlgoSigner = ({ connect }: Props) => {
    const { navigateRoute, mobile } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        // debugger;
        const account = await connect("AlgoSigner");
        dispatch(setAccount(account.address));
        dispatch(setSigner(account.signer));
        const client = await createClient(
            account.signer,
            account.address,
            appAdress3Months
        );
        dispatch(setClient(client));
        navigate(navigateRoute);
        dispatch(setConnectModalShow(false));
    };

    return (
        <button
            onClick={handleClick}
            className="connectBtn"
            style={{ display: mobile ? "none" : "auto" }}
        >
            <img style={{ width: "28px" }} src={icon} alt="" />
            AlgoSigner
        </button>
    );
};

export default HigherALGO(AlgoSigner);
