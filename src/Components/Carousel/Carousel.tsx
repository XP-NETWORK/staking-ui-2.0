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
                        />
                        // <div className="carousel-item__wrapper">
                        //     <img
                        //         key={i}
                        //         src={e.displayImage}
                        //         alt="nft"
                        //         onClick={() => handleMainStakeChange(i)}
                        //         style={{
                        //             border: `${
                        //                 i === selectedStakeIndex
                        //                     ? " 4px solid rgba(229, 232, 240, 0.1)"
                        //                     : "4px solid rgba(45, 45, 48, 0.4)"
                        //             }`,
                        //         }}
                        //     />
                        //     <div className="item-loader"></div>
                        // </div>
                    );
                })}
            </div>
        </div>
    );
}
