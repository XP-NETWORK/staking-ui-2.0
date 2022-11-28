import React, { useState } from "react";
interface Props {
    item: any;
    changeId: any;
    index: number;
    selectedIndex: number;
}
export default function CarouselItem({
    item,
    changeId,
    index,
    selectedIndex,
}: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="carousel-item__wrapper">
            <img
                onLoad={(e) => setLoaded(true)}
                src={item.displayImage}
                alt="nft"
                onClick={() => changeId(index)}
                style={{
                    border: `${
                        index === selectedIndex
                            ? " 4px solid rgba(229, 232, 240, 0.1)"
                            : "4px solid rgba(45, 45, 48, 0.4)"
                    }`,
                }}
            />
            {!loaded && <div className="item-loader"></div>}
        </div>
    );
}
