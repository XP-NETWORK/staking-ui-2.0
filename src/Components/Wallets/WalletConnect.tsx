/* eslint-disable  */

import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEvmAccount, setEvmStakes } from "../../store/reducer/homePageSlice";
import { getContract, getAccount } from "wagmi/actions";
import { usePublicClient, useNetwork } from "wagmi";
import xpNetStaker from "./../../ABI/xpNetStaker.json";

import { getAmountOfEVMTokensStaked } from "../../assets/ts/evmUtils";

const WalletConnect = () => {
    //const [uri, setUri] = useState<string>("");

    // const [address, setAddress] = useState<string>("");
    const dispatch = useDispatch();
    //@ts-ignore

    const { address, connector } = useAccount();

    const { chain } = useNetwork();
    console.log(address, chain, connector, "address");
    // console.log(
    //     "🚀 ~ file: WalletConnect.tsx:16 ~ WalletConnect ~ address",
    //     address
    // );
    const provider = usePublicClient();

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

    const { open } = useWeb3Modal();

    const handleClick = async () => {
        if (!address) await open();
        else dispatch(setEvmAccount(address));
    };

    const amountOfTokenByIndex = async (
        address: string,
        stakeContract: any
    ) => {
        let stakes: number | undefined;
        try {
            stakes = await getAmountOfEVMTokensStaked(address, stakeContract);
            dispatch(setEvmStakes(stakes));
        } catch (error) {
            console.log(error);
        }
    };

    /*const onSignIn = useCallback(() => {
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
    }, [client, setUri]);*/

    useEffect(() => {
        if (address) {
            const contract = getContract({
                address: process.env
                    .REACT_APP_XPNET_STAKE_TOKEN as `0x${string}`,
                abi: xpNetStaker,
                walletClient: provider,
            });
            console.log(contract, "contract");
            dispatch(setEvmAccount(address));
            amountOfTokenByIndex(address as string, undefined);
        }
        /*AuthClient.init({
            relayUrl: "",
            projectId: wcId,
            metadata: {
                name: "react-dapp-auth",
                description: "React Example Dapp for Auth",
                url: window.location.host,
                icons: [],
            },
        })
            .then(() => {
                //setClient(authClient);
                //setHasInitialized(true);
            })
            .catch(console.error);
        if (address) {
            dispatch(setEvmAccount(address));
            amountOfTokenByIndex(address);
        }*/
    }, [address]);

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            WalletConnect
        </button>
    );
};

export default HigherEVM(WalletConnect);
