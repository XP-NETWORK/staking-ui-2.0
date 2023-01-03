import classNames from "classnames";
import { IFetchedStake, INFT, INFTURI } from "../../assets/ts/Consts";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { getAllAlgoStakes, getAllNFTsByOwner } from "../../assets/ts/algoUtils";
import Carousel from "../Carousel/Carousel";
import CarouselMainItemList from "../Carousel/CarouselMainItemList";
import { useDispatch } from "react-redux";
import {
    setFetchedAlgoStakes,
    setNFTSByOwner,
    setSelectedNFT,
} from "../../store/reducer/homePageSlice";

import AlgoNFTActions from "./AlgoNFTActions";
interface Props {
    stakes: IFetchedStake[];
    setIndex: any;
    selectedStakeIndex: number;
}

export const AlgoNFTRewards = ({
    stakes,
    selectedStakeIndex,
    setIndex,
}: Props) => {
    const dispatch = useDispatch();
    const [x, setX] = useState(0);
    const [mainImageLoaded, setMainImageLoaded] = useState(false);
    const { account, activeSessionStakes, nfts, selectedNFTtxId } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {
        let getAllNFTsByOwnerInterval: any;
        const nfts = async () => {
            let nfts: any;
            nfts = await getAllNFTsByOwner(account, stakes);
            getAllNFTsByOwnerInterval = setInterval(async () => {
                nfts = await getAllNFTsByOwner(account, stakes);
                console.log("getAllNFTsByOwnerInterval", nfts);
            }, 2000);
            dispatch(setNFTSByOwner(nfts));
            if (nfts) dispatch(setSelectedNFT(nfts[0].txId));
        };
        if (account) {
            nfts();
        }
        return () => clearInterval(getAllNFTsByOwnerInterval);
    }, []);

    useEffect(() => {
        const updateAlgoSTakes = async () => {
            const stakes = await getAllAlgoStakes(account);
            dispatch(setFetchedAlgoStakes(stakes));
        };
        updateAlgoSTakes();
    }, [activeSessionStakes, account, dispatch]);

    const handleSwap = (next: boolean) => {
        // debugger;
        switch (next) {
            case false:
                if (selectedStakeIndex !== 0) {
                    if (selectedStakeIndex <= 3) {
                        const index = nfts.findIndex(
                            (e: INFT) => e.txId === selectedNFTtxId
                        );
                        dispatch(setSelectedNFT(nfts[index - 1].txId));
                        setIndex(selectedStakeIndex - 1);
                    } else {
                        const index = nfts.findIndex(
                            (e: INFT) => e.txId === selectedNFTtxId
                        );
                        dispatch(setSelectedNFT(nfts[index - 1].txId));
                        setIndex(selectedStakeIndex - 1);
                        setX((prev) => prev + 110);
                    }
                }
                break;
            case true:
                if (selectedStakeIndex !== stakes?.length - 1) {
                    setIndex(selectedStakeIndex + 1);
                    const index = nfts.findIndex(
                        (e: INFT) => e.txId === selectedNFTtxId
                    );
                    dispatch(setSelectedNFT(nfts[index + 1].txId));
                    if (stakes.length > 4 && selectedStakeIndex >= 3) {
                        setX((prev) => prev - 110);
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleMainStakeChange = (i: number) => {
        setIndex(i);
    };

    return (
        <div className="algo-nft-rewards__wrapper">
            <div className={classNames("containerRight", "container")}>
                <h1>NFT Rewards</h1>
                <label className="line" />
                <div className={classNames("sectionWrapper")}>
                    <div className="rewardsContainerMain">
                        <button
                            className="btnWrap"
                            onClick={() => handleSwap(false)}
                        >
                            <img src={left} alt="left" />
                        </button>
                        <CarouselMainItemList
                            nfts={nfts}
                            selectedStakeIndex={selectedStakeIndex}
                            setLoaded={setMainImageLoaded}
                        />
                        <button
                            className="btnWrap"
                            onClick={() => handleSwap(true)}
                        >
                            <img src={right} alt="right" />
                        </button>
                    </div>
                    <AlgoNFTActions nfts={nfts} index={selectedStakeIndex} />
                    <Carousel
                        nfts={nfts}
                        stakes={stakes}
                        x={x}
                        selectedStakeIndex={selectedStakeIndex}
                        handleMainStakeChange={handleMainStakeChange}
                    />
                </div>
            </div>
            {/* {!mainImageLoaded && (
                <div className={classNames("right-placeholder container")}>
                    <h1>NFT Rewards</h1>
                    <label className="line" />
                    <div className="nft-rewards-placeholder">
                        <div className="image-placeholder"></div>
                        <div className="actions-placeholder"></div>
                        <div className="nfts-btns-placeholder">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};
