import React from "react";
import { IFetchedStake } from "../../assets/ts/Consts";
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
                    <div className="carousel-main-image__wrapper">
                        <img
                            key={i}
                            style={{
                                display:
                                    selectedStakeIndex === i ? "block" : "none",
                            }}
                            src={stake.displayImage}
                            alt="NFT"
                            className="imgMain"
                        />
                    </div>
                );
            })}
        </div>
    );
}
