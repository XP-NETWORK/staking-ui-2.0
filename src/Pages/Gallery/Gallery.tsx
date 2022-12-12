import React, { FC, useRef, useState } from "react";
import "./gallery.scss";
import search from "../../assets/images/search.svg";
import { NftGalleryItem } from "../../Components/NftGalleryItem/NftGalleryItem";
import { getNFTCollection } from "../../assets/ts/algoUtils";
const nfts = new Array(15).fill(
    "https://nft-service-testing.s3.eu-west-1.amazonaws.com"
);

interface Props {}

export const Gallery: FC<Props> = ({}) => {
    const [galleryToShow, setGalleryToShow] = useState([{}]);
    const ref = useRef(0);
    const [index, setIndex] = useState(1);
    const [goingUp, setGoingUp] = useState(false);

    const onScroll = (e: any) => {
        const currentScrollY = e.target.scrollTop;
        console.log(
            "🚀 ~ file: Gallery.tsx:20 ~ onScroll ~ currentScrollY",
            ref.current,
            currentScrollY
        );
        var element = e.target;

        if (ref.current < currentScrollY && goingUp) {
            setGoingUp(false);
        } else if (
            element.scrollHeight - element.scrollTop <
            element.clientHeight + 10
        ) {
            setGoingUp(true);
            // getNFTCollection(index);
            setIndex(index + 5);
        }
        ref.current = currentScrollY;
    };

    return (
        <div className="galleryPage">
            <h1>XPNET NFT Collection</h1>
            <input type="text" placeholder="Search NFT" />
            <div onScroll={onScroll} className="nfts">
                {nfts.map((e: any, i: number) => (
                    <NftGalleryItem key={i} url={`${e}/${i + 1}.png`} />
                ))}
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
