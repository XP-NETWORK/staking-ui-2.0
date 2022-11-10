import React, { FC } from "react";
import "./nftGalleryItem.scss";
import nft from "../../assets/images/gal.png";

interface Props {}

export const NftGalleryItem: FC<Props> = ({}) => {
  return (
    <div className="nftItemContainer">
      <img src={nft} />
      <label>XPNET #01</label>
    </div>
  );
};
