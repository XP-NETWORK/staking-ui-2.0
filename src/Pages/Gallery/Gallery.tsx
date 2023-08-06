import React, { FC, useEffect, useRef, useState } from "react";
import "./gallery.scss";

import { NftGalleryItem } from "../../Components/NftGalleryItem/NftGalleryItem";
import { getNFTCollection } from "../../assets/ts/algoUtils";
import { INFTURI } from "../../assets/ts/Consts";
import { useDispatch } from "react-redux";
import { setNFTCollection } from "../../store/reducer/homePageSlice";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {}

export const Gallery: FC<Props> = () => {
    const dispatch = useDispatch();
    const { collections } = useSelector((state: ReduxState) => state.homePage);

    const [input, setInput] = useState<string | undefined>("");

    const ref = useRef(0);
    const [index, setIndex] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    const onScroll = (e: any) => {
        const currentScrollY = e.currentTarget.scrollTop;
        const element = e.currentTarget;

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
        const getNfts = async () => {
            const newArr = await getNFTCollection();
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
                {input
                    ? collections
                          ?.filter((nft: INFTURI) => nft.name === input)
                          .map((nft: INFTURI, i: number) => (
                              <NftGalleryItem
                                  key={i}
                                  url={nft.image}
                                  nft={nft}
                              />
                          ))
                    : collections?.map((e: any, i: number) => (
                          <NftGalleryItem key={i} url={e.image} nft={e} />
                      ))}
            </div>
        </div>
    );
};
