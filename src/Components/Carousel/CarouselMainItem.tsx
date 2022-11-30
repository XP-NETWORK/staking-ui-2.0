import React, { useState } from "react";
import { INFT } from "../../assets/ts/Consts";

interface Props {
    index: number;
    nft: INFT;
    selectedStakeIndex: number;
}

export default function CarouselMainItem({
    index,
    nft,
    selectedStakeIndex,
}: Props) {
    const [loaded, setLoaded] = useState(false);

    const handleLoaded = () => {
        setLoaded(true);
    };

    return (
        <div key={`m-${index}`} className="carousel-main-image__wrapper">
            <img
                onLoad={handleLoaded}
                key={index}
                style={{
                    display: selectedStakeIndex === index ? "block" : "none",
                }}
                src={nft.Uri.image}
                alt="NFT"
                className="imgMain"
            />
            {!loaded && <div className="carousel-main-image-placeholder"></div>}
        </div>
    );
}
