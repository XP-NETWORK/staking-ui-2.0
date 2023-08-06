import { FC } from "react";
import { WagmiConfig } from "wagmi";
import MetaMask from "./MetaMask";
import WalletConnect from "./WalletConnect";
import { wagmiConfig } from "./walletConnectors";

interface Props {}

/**
 *
 * @returns
 */

export const EVMWallets: FC<Props> = () => {
    return (
        //@ts-ignore
        <WagmiConfig config={wagmiConfig}>
            <MetaMask />
            <WalletConnect />
        </WagmiConfig>
    );
};
