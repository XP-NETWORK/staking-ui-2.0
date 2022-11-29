import React, { useState } from "react";

interface Props {
    index: number;
    stake: any;
    selectedStakeIndex: number;
}

export default function CarouselMainItem({
    index,
    stake,
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
                src={stake.displayImage}
                alt="NFT"
                className="imgMain"
            />
            {!loaded && <div className="carousel-main-image-placeholder"></div>}
        </div>
    );
}
