import { FC } from "react";
import { WagmiConfig } from "wagmi";
import MetaMask from "./MetaMask";
import WalletConnect from "./WalletConnect";
import { wagmiClient } from "./walletConnectors";

interface Props {}

export const EVMWallets: FC<Props> = ({}) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <MetaMask />
            <WalletConnect />
        </WagmiConfig>
    );
};
