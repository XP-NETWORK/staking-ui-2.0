import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/MyAlgo.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import { createClient } from "../../assets/ts/algoUtils";
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

const MyAlgo = ({ connect }: Props) => {
    const { navigateRoute } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        debugger;
        let account = await connect("MyAlgo");
        dispatch(setAccount(account.address));
        dispatch(setSigner(account.signer));
        let client = await createClient(
            account.signer,
            account.address,
            appAdress3Months
        );

        dispatch(setClient(client));
        navigate(navigateRoute);
        dispatch(setConnectedWallet("MyAlgo"));
        dispatch(setConnectModalShow(false));
    };
    return (
        <button onClick={handleClick} className="connectBtn">
            <img src={icon} alt="" />
            MyAlgo
        </button>
    );
};

export default HigherALGO(MyAlgo);
