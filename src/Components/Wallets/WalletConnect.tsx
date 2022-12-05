import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEvmAccount } from "../../store/reducer/homePageSlice";
import { useContract } from "wagmi";
import xpNetStaker from "./../../ABI/xpNetStaker.json";

const WalletConnect = ({ connect }: { connect: Function }) => {
    const dispatch = useDispatch();
    const { address, isConnecting, isDisconnected } = useAccount();
    const evmStake = process.env.REACT_APP_XPNET_STAKE_TOKEN as string;

    const contract = useContract({
        address: evmStake,
        abi: xpNetStaker,
    });

    const { open } = useWeb3Modal();

    const handleClick = async () => {
        if (!address) open();
        else dispatch(setEvmAccount(address));
    };

    useEffect(() => {
        if (address) {
            dispatch(setEvmAccount(address));
        }
    }, [address]);

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            WalletConnect
        </button>
    );
};

export default HigherEVM(WalletConnect);
