import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEvmAccount, setEvmStakes } from "../../store/reducer/homePageSlice";
import { useContract, useContractRead, useProvider } from "wagmi";
import xpNetStaker from "./../../ABI/xpNetStaker.json";
import xpNetToken from "./../../ABI/xpNetToken.json";
import { getAmountOfEVMTokensStaked } from "../../assets/ts/evmUtils";

const WalletConnect = ({ connect }: { connect: Function }) => {
    const dispatch = useDispatch();
    const { address, isConnecting, isDisconnected } = useAccount();
    console.log(
        "🚀 ~ file: WalletConnect.tsx:21 ~ WalletConnect ~ address",
        address
    );
    const provider = useProvider();

    const stakeContract = useContract({
        address: process.env.REACT_APP_XPNET_STAKE_TOKEN as string,
        abi: xpNetStaker,
        signerOrProvider: provider,
    });
    //! TODO
    // const { data, isError, isLoading } = useContractRead({
    //     address: process.env.REACT_APP_XPNET_STAKE_TOKEN as string,
    //     abi: xpNetStaker,
    //     functionName: "balanceOf",
    //     args: [address],
    // });

    const xpNetContract = useContract({
        address: process.env.REACT_APP_XPNET_TOKEN as string,
        abi: xpNetToken,
        signerOrProvider: provider,
    });

    const { open } = useWeb3Modal();

    const handleClick = async () => {
        if (!address) open();
        else dispatch(setEvmAccount(address));
    };

    const amountOfTokenByIndex = async (address: string) => {
        let stakes: number | undefined;
        try {
            stakes = await getAmountOfEVMTokensStaked(address, stakeContract);
            dispatch(setEvmStakes(stakes));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (address) {
            dispatch(setEvmAccount(address));
            amountOfTokenByIndex(address);
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
