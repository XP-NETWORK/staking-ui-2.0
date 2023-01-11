import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEvmAccount, setEvmStakes } from "../../store/reducer/homePageSlice";
import { useContract, useContractRead, useProvider } from "wagmi";
import xpNetStaker from "./../../ABI/xpNetStaker.json";
import xpNetToken from "./../../ABI/xpNetToken.json";
import { getAmountOfEVMTokensStaked } from "../../assets/ts/evmUtils";
// import { authClient, wcId } from "./walletConnectors";
import AuthClient, { generateNonce } from "@walletconnect/auth-client";
import { wcId } from "./walletConnectors";

const WalletConnect = ({ connect }: { connect: Function }) => {
    const [client, setClient] = useState<AuthClient | null>();
    const [hasInitialized, setHasInitialized] = useState(false);
    const [uri, setUri] = useState<string>("");
    console.log("🚀 ~ file: WalletConnect.tsx:20 ~ WalletConnect ~ uri", uri);
    // const [address, setAddress] = useState<string>("");
    const dispatch = useDispatch();
    const { address, isConnecting, isDisconnected } = useAccount();
    // console.log(
    //     "🚀 ~ file: WalletConnect.tsx:16 ~ WalletConnect ~ address",
    //     address
    // );
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

    // const xpNetContract = useContract({
    //     address: process.env.REACT_APP_XPNET_TOKEN as string,
    //     abi: xpNetToken,
    //     signerOrProvider: provider,
    // });

    const { isOpen, open, close } = useWeb3Modal();

    const handleClick = async () => {
        debugger;
        if (!address) await open();
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

    const onSignIn = useCallback(() => {
        if (!client) return;
        client
            .request({
                aud: window.location.href,
                domain: window.location.hostname.split(".").slice(-2).join("."),
                chainId: "eip155:1",
                type: "eip4361",
                nonce: generateNonce(),
                statement: "Sign in with wallet.",
            })
            .then(({ uri }) => setUri(uri));
    }, [client, setUri]);

    useEffect(() => {
        AuthClient.init({
            relayUrl: uri,
            projectId: wcId,
            metadata: {
                name: "react-dapp-auth",
                description: "React Example Dapp for Auth",
                url: window.location.host,
                icons: [],
            },
        })
            .then((authClient) => {
                setClient(authClient);
                setHasInitialized(true);
            })
            .catch(console.error);
        if (address) {
            dispatch(setEvmAccount(address));
            amountOfTokenByIndex(address);
        }
        // authClient?.on("auth_response", ({ params }) => {
        //     if (Boolean(params.result?.s)) {
        //       // Response contained a valid signature -> user is authenticated.
        //     } else {
        //       // Handle error or invalid signature case
        //       console.error(params.message);
        //     }
        //   });
    }, [address]);

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            WalletConnect
        </button>
    );
};

export default HigherEVM(WalletConnect);
