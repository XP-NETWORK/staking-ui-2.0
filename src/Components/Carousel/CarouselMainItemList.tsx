import React from "react";
import { useSelector } from "react-redux";
import { INFT } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import CarouselMainItem from "./CarouselMainItem";
interface Props {
    nfts: INFT[];
    selectedStakeIndex: number;
    setLoaded: any;
}
export default function CarouselMainItemList({
    selectedStakeIndex,
    setLoaded,
}: Props) {
    const { nfts } = useSelector((state: ReduxState) => state.homePage);

    return (
        <div>
            {nfts &&
                nfts?.map((nft: INFT, i) => {
                    return (
                        <CarouselMainItem
                            key={i}
                            index={i}
                            selectedStakeIndex={selectedStakeIndex}
                            nft={nft}
                            updateLoadedInMain={setLoaded}
                        />
                    );
                })}
        </div>
    );
}
