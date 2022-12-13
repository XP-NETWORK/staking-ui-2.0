import React, { FC, useEffect, useRef, useState } from "react";
import "./gallery.scss";
import search from "../../assets/images/search.svg";
import { NftGalleryItem } from "../../Components/NftGalleryItem/NftGalleryItem";
import { getNFTCollection } from "../../assets/ts/algoUtils";
import { INFTURI } from "../../assets/ts/Consts";
// const nfts = new Array(15).fill(
//     "https://nft-service-testing.s3.eu-west-1.amazonaws.com"
// );

interface Props {}

export const Gallery: FC<Props> = ({}) => {
    const [galleryToShow, setGalleryToShow] = useState([{}]);
    const ref = useRef(0);
    const [index, setIndex] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [nfts, setNfts] = useState<INFTURI[]>();
    console.log("🚀 ~ file: Gallery.tsx:19 ~ nfts", nfts);

    const onScroll = (e: any) => {
        const currentScrollY = e.currentTarget.scrollTop;
        var element = e.currentTarget;

        if (ref.current < currentScrollY && isFetching) {
            setIsFetching(false);
        }
        if (
            element.scrollHeight - element.scrollTop <
            element.clientHeight + 2
        ) {
            setIsFetching(true);
            setIndex(index + 15);
        }
        ref.current = currentScrollY;
    };

    const getNfts = async () => {
        const newArr = await getNFTCollection(index);
        console.log({ newArr });

        setNfts(newArr);
    };

    useEffect(() => {
        const getNfts = async () => {
            const newArr = await getNFTCollection(index);
            let newNfts = [...(nfts ? nfts : []), ...newArr];
            console.log({ newNfts });

            setNfts(newNfts);
        };
        getNfts();
    }, [index]);

    return (
        <div className="galleryPage">
            <h1>XPNET NFT Collection</h1>
            <input type="text" placeholder="Search NFT" />
            <div onScroll={onScroll} className="nfts">
                {nfts?.map((e: any, i: number) => (
                    <NftGalleryItem key={i} url={e.image} nft={e} />
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
