import React from "react";
import { IFetchedStake, INFT } from "../../assets/ts/Consts";
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
    nfts,
}: Props) {
    return (
        <div className="nftsRewardsContainer">
            <div style={{ transform: `translateX(${x}px)` }}>
                {nfts?.map((e: INFT, i: any) => {
                    return (
                        <CarouselItem
                            key={i}
                            item={e}
                            changeId={handleMainStakeChange}
                            index={i}
                            selectedIndex={selectedStakeIndex}
                            length={stakes.length}
                        />
                    );
                })}
            </div>
        </div>
    );
}
//style={{ transform: `translateX(${x}px)` }}
