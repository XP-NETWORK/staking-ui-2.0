import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { INFT } from "../../assets/ts/Consts";
import { setSelectedNFT } from "../../store/reducer/homePageSlice";
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
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    const handleSelect = () => {
        changeId(index);
        dispatch(setSelectedNFT(item?.txId));
    };

    return (
        <div className="carousel-item__wrapper">
            <img
                onLoad={(e) => setLoaded(true)}
                src={item.Uri.image}
                alt="nft"
                onClick={handleSelect}
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
