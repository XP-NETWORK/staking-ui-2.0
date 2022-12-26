import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import "./nftGalleryItem.scss";
import nft from "../../assets/images/gal.png";
import { INFT, INFTURI } from "../../assets/ts/Consts";
import placeholder from "./../../assets/images/placeholder.png";

interface Props {
    url: string;
    nft: INFTURI;
}

export const NftGalleryItem: FC<Props> = ({ nft }) => {
    const cardRef = useRef(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    console.log("🚀 ~ file: NftGalleryItem.tsx:14 ~ loading", loaded);
    // const [isVisible, setIsVisible] = useState(false);

    const options = useMemo(() => {
        return {
            root: null,
            tootMargin: "0px",
            threshold: 0.3,
        };
    }, []);

    // const callBackWhenObserver = (entries: any) => {
    //     const [entry] = entries;
    //     setIsVisible(entry.isIntersecting);
    // };

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         callBackWhenObserver,
    //         options
    //     );
    //     const currentTarget = cardRef.current;

    //     if (currentTarget) observer.observe(currentTarget);
    //     return () => {
    //         if (currentTarget) {
    //             observer.unobserve(currentTarget);
    //         }
    //     };
    // }, [cardRef, options]);

    // useEffect(() => {}, [nft]);

    return (
        <div ref={cardRef} className="nftItemContainer">
            <img
                onLoad={() => setLoaded(true)}
                loading="lazy"
                src={nft.image}
                alt=""
            />
            <label>{nft.name}</label>
            {!loaded && (
                <div className="nftItemContainer-placeholder">
                    <img src={placeholder} alt="" />
                </div>
            )}
        </div>
    );
};
