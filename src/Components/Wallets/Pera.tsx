import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { PeraWalletConnect } from "@perawallet/connect";
import { useNavigate, useParams } from "react-router";
import {
  setClient,
  setPeraConnection,
} from "../../store/reducer/homePageSlice";
import { useDispatch } from "react-redux";
import { appAdress3Months } from "../../assets/ts/Consts";
import { createClient } from "../../assets/ts/algoUtils";

const Pera = ({
  styles,
  connect,
}: {
  styles: () => Object;
  connect: Function;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const peraWallet = useMemo(() => {
    const wallet = new PeraWalletConnect();
    return wallet;
  }, []);

  // const peraWallet = new PeraWalletConnect();

  const account = useSelector((state: ReduxState) => state.homePage.account);
  const signer = useSelector((state: ReduxState) => state.homePage.account);

  const peraConnection = useSelector(
    (state: ReduxState) => state.homePage.peraConnection
  );
  let { to } = useParams();

  const getClient = useCallback(async () => {
    let client = await createClient(signer, account, appAdress3Months);
    dispatch(setClient(client));
  }, [account, dispatch, signer]);

  useEffect(() => {
    if (account) {
      to === "stake" ? navigate("/stake") : navigate("/rewards");
      dispatch(setPeraConnection(false));
    }
    if (account) getClient();
  }, [account, navigate, to, dispatch, getClient]);

  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet?.connector?.on("disconnect", () => {});

        if (accounts.length) {
        }
      })
      .catch((e) => console.log(e));

    return () => {
      peraWallet.disconnect();
    };
  }, [peraConnection, peraWallet]);

  const handleClick = async () => {
    await connect("Pera");
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
