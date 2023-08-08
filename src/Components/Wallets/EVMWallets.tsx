import { FC } from "react";

import MetaMask from "./MetaMask";
import WalletConnect from "./WalletConnect";

interface Props {}

/**
 *
 * @returns
 */

export const EVMWallets: FC<Props> = () => {
    return (
        <>
            <MetaMask />
            <WalletConnect />
        </>
    );
};
