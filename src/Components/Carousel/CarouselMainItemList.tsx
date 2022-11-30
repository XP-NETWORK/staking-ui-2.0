import React from "react";
import { IFetchedStake } from "../../assets/ts/Consts";
import CarouselMainItem from "./CarouselMainItem";
interface Props {
    stakes: IFetchedStake[];
    selectedStakeIndex: number;
}
export default function CarouselMainItemList({
    stakes,
    selectedStakeIndex,
}: Props) {
    return (
        <div>
            {stakes.map((stake: IFetchedStake, i) => {
                return (
                    <CarouselMainItem
                        key={i}
                        index={i}
                        selectedStakeIndex={selectedStakeIndex}
                        stake={stake}
                    />
                    // <div
                    //     key={`m-${i}`}
                    //     className="carousel-main-image__wrapper"
                    // >
                    //     <img
                    //         key={i}
                    //         style={{
                    //             display:
                    //                 selectedStakeIndex === i ? "block" : "none",
                    //         }}
                    //         src={stake.displayImage}
                    //         alt="NFT"
                    //         className="imgMain"
                    //     />
                    //     <div className="carousel-main-image-placeholder"></div>
                    // </div>
                );
            })}
        </div>
    );
}
