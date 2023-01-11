import React from "react";
import { useSelector } from "react-redux";
import { IFetchedStake, INFT } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import "./carousel.scss";
import CarouselItem from "./CarouselItem";
interface Props {
    stakes: IFetchedStake[];
    x: number;
    selectedStakeIndex: number;
    handleMainStakeChange: any;
    nfts: INFT[];
}

export default function Carousel({
    stakes,
    x,
    selectedStakeIndex,
    handleMainStakeChange,
}: // nfts,
Props) {
    console.log(
        "🚀 ~ file: Carousel.tsx:22 ~ selectedStakeIndex",
        selectedStakeIndex
    );
    const nfts = useSelector((state: ReduxState) => state.homePage.nfts);

    return (
        <div className="nftsRewardsContainer">
            <div style={{ transform: `translateX(${x}px)` }}>
                {/* <div> */}
                {nfts?.map((e: INFT, i: any) => {
                    return (
                        <CarouselItem
                            key={i}
                            item={e}
                            changeId={handleMainStakeChange}
                            index={i}
                            selectedIndex={selectedStakeIndex}
                        />
                    );
                })}
            </div>
        </div>
    );
}
//style={{ transform: `translateX(${x}px)` }}
