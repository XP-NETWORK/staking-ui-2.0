import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { INFT } from "../../assets/ts/Consts";
import { setSelectedNFT } from "../../store/reducer/homePageSlice";
interface Props {
    item: any;
    changeId: any;
    index: number;
    selectedIndex: number;
    isClaimed: boolean;
}
export default function CarouselItem({
    item,
    changeId,
    index,
    selectedIndex,
    isClaimed,
}: Props) {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    const [selected, setSelected] = useState<boolean>();
    const [hovered, setHovered] = useState<boolean>();

    const handleSelect = () => {
        changeId(index);
        dispatch(setSelectedNFT(item?.txId));
    };

    useEffect(() => {
        if (index === selectedIndex) {
            setSelected(true);
        } else setSelected(false);
    }, [selectedIndex]);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="carousel-item__wrapper"
        >
            <img
                className={
                    isClaimed
                        ? "claimed-image"
                        : selected
                        ? "selected-image"
                        : hovered
                        ? "hovered-image"
                        : "regular-image"
                }
                onLoad={(e) => setLoaded(true)}
                src={item.Uri.image}
                alt="nft"
                onClick={handleSelect}
                style={{
                    borderColor:
                        isClaimed && selected ? "rgba(35, 136, 255, 0.4)" : "",
                }}
            />
            {!loaded && <div className="item-loader"></div>}
            {isClaimed && <div className="claimed-label"></div>}
        </div>
    );
}
