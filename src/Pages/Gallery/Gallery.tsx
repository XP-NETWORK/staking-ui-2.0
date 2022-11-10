import React, { FC, useState } from "react";
import "./gallery.scss";
import search from "../../assets/images/search.svg";
import { NftGalleryItem } from "../../Components/NftGalleryItem/NftGalleryItem";

interface Props {}

export const Gallery: FC<Props> = ({}) => {
  const [galleryToShow, setGalleryToShow] = useState([{}]);
  return (
    <div className="galleryPage">
      <h1>XPNET NFT Collection</h1>
      <input type="text" placeholder="Search NFT" />
      <div className="nfts">
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
        <NftGalleryItem/>
      </div>
      {galleryToShow.length < 1 && (
        <div className="noNfts">
          0 results
          <label>No items found for this search</label>
          <button>Back to all items</button>
        </div>
      )}
    </div>
  );
};
