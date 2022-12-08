import React, { FC } from "react";
import "./nftGalleryItem.scss";
import nft from "../../assets/images/gal.png";

interface Props {
    url: string;
}

export const NftGalleryItem: FC<Props> = ({ url }) => {
    const src = url;

    return (
        <div className="nftItemContainer">
            <img loading="lazy" src={src} alt="" />
            <label>XPNET #01</label>
        </div>
    );
};
