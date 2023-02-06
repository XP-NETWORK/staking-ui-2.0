import { FC } from "react";
import AlgoSigner from "./AlgoSigner";
import MyAlgo from "./MyAlgo";
import Pera from "./Pera";

interface Props {}

export const AlgorandWallets: FC<Props> = () => {
    return (
        <>
            <Pera />
            <MyAlgo />
            <AlgoSigner />
        </>
    );
};
