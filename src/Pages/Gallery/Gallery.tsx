import React, { FC, useEffect, useRef, useState } from "react";
import "./gallery.scss";
import search from "../../assets/images/search.svg";
import { NftGalleryItem } from "../../Components/NftGalleryItem/NftGalleryItem";
import { getNFTCollection } from "../../assets/ts/algoUtils";
import { INFTURI } from "../../assets/ts/Consts";
import { useDispatch } from "react-redux";
import { setNFTCollection } from "../../store/reducer/homePageSlice";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
// const nfts = new Array(15).fill(
//     "https://nft-service-testing.s3.eu-west-1.amazonaws.com"
// );

interface Props {}

export const Gallery: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const { collections } = useSelector((state: ReduxState) => state.homePage);
    const [gallery, setGallery] = useState<INFTURI[]>([]);
    console.log("🚀 ~ file: Gallery.tsx:21 ~ gallery", gallery);
    const [input, setInput] = useState<string | undefined>("");

    const ref = useRef(0);
    const [index, setIndex] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

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

    useEffect(() => {
        if (input) {
            const newCollection = collections.filter(
                (nft: INFTURI) => nft.name === input
            );
            setGallery(newCollection);
        } else {
            setGallery(collections);
        }
    }, [input]);

    useEffect(() => {
        const getNfts = async () => {
            const newArr = await getNFTCollection(index);
            // let newNfts = [...(nfts ? nfts : []), ...newArr];
            // setNfts(newNfts);
            dispatch(setNFTCollection(newArr));
        };
        getNfts();
    }, [index]);

    return (
        <div className="galleryPage">
            <h1>XPNET NFT Collection</h1>
            <input
                type="text"
                placeholder="Search NFT"
                onChange={(e) => setInput(e.target.value)}
            />
            <div onScroll={onScroll} className="nfts">
                {gallery?.map((e: any, i: number) => (
                    <NftGalleryItem key={i} url={e.image} nft={e} />
                ))}
            </div>
            {/* {galleryToShow.length < 1 && (
                <div className="noNfts">
                    0 results
                    <label>No items found for this search</label>
                    <button>Back to all items</button>
                </div>
            )} */}
        </div>
    );
};
