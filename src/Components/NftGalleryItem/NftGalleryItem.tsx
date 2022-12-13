import React, { FC } from "react";
import "./nftGalleryItem.scss";
import nft from "../../assets/images/gal.png";
import { INFT, INFTURI } from "../../assets/ts/Consts";

interface Props {
    url: string;
    nft: INFTURI;
}

export const NftGalleryItem: FC<Props> = ({ url, nft }) => {
    console.log("🚀 ~ file: NftGalleryItem.tsx:12 ~ nft", nft);
    return (
        <div className="nftItemContainer">
            <img loading="lazy" src={nft.image} alt="" />
            <label>{nft.name}</label>
        </div>
    );
};
