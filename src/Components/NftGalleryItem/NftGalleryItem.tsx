import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import "./nftGalleryItem.scss";
import nft from "../../assets/images/gal.png";
import { INFT, INFTURI } from "../../assets/ts/Consts";

interface Props {
    url: string;
    nft: INFTURI;
}

export const NftGalleryItem: FC<Props> = ({ nft }) => {
    const cardRef = useRef(null);

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

    useEffect(() => {}, [nft]);

    return (
        <div ref={cardRef} className="nftItemContainer">
            <img loading="lazy" src={nft.image} alt="" />
            <label>{nft.name}</label>
            <div className="nftItemContainer-placeholder"></div>
        </div>
    );
};
