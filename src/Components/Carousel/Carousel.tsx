import React from "react";
import { IFetchedStake } from "../../assets/ts/Consts";
import "./carousel.scss";
import CarouselItem from "./CarouselItem";
interface Props {
    stakes: IFetchedStake[];
    x: number;
    selectedStakeIndex: number;
    handleMainStakeChange: any;
}

export default function Carousel({
    stakes,
    x,
    selectedStakeIndex,
    handleMainStakeChange,
}: Props) {
    return (
        <div className="nftsRewardsContainer">
            <div style={{ transform: `translateX(${x}px)` }}>
                {stakes?.map((e: IFetchedStake, i: any) => {
                    return (
                        <CarouselItem
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
