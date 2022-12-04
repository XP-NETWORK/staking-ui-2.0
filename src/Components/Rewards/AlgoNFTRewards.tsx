import classNames from "classnames";
import { IFetchedStake, INFT } from "../../assets/ts/Consts";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
// import ClipboardCopy from "../ClipboardCopy/ClipboardCopy";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import {
    checkIfOpIn,
    getAllAlgoStakes,
    getAllNFTsByOwner,
} from "../../assets/ts/algoUtils";
import Carousel from "../Carousel/Carousel";
import CarouselMainItemList from "../Carousel/CarouselMainItemList";
import { useDispatch } from "react-redux";
import {
    setFetchedAlgoStakes,
    setNFTSByOwner,
    setSelectedNFT,
} from "../../store/reducer/homePageSlice";
import ClipboardCopy from "../ClipboardCopy/ClipboardCopy";
import { Staking } from "../../assets/ts/StakingClient";
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
    const {
        account,
        activeSessionStakes,
        nfts,
        selectedNFTtxId,
        stakingClient,
    } = useSelector((state: ReduxState) => state.homePage);

    const isAssetOptIn = () => {
        checkIfOpIn(nfts[selectedStakeIndex]?.assetId, account);
    };
    isAssetOptIn();

    useEffect(() => {
        const nfts = async () => {
            const nfts = await getAllNFTsByOwner(account, stakes);
            dispatch(setNFTSByOwner(nfts));
            if (nfts) dispatch(setSelectedNFT(nfts[0].txId));
        };
        if (account) {
            nfts();
        }
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
                    />
                    <button
                        className="btnWrap"
                        onClick={() => handleSwap(true)}
                    >
                        <img src={right} alt="right" />
                    </button>
                </div>
                <AlgoNFTActions nfts={nfts} index={selectedStakeIndex} />
                {/* <div className="nft-actions">
                    <ClipboardCopy
                        index={selectedStakeIndex}
                        item={nfts[selectedStakeIndex]}
                    />
                    <div className="nft-actions-button">Opt-In</div>
                    <div
                        className={`nft-actions-button${
                            nfts[selectedStakeIndex]?.isClaimed
                                ? "--disabled"
                                : ""
                        }`}
                    >
                        Claim
                    </div>
                </div> */}
                <Carousel
                    nfts={nfts}
                    stakes={stakes}
                    x={x}
                    selectedStakeIndex={selectedStakeIndex}
                    handleMainStakeChange={handleMainStakeChange}
                />
                {/* <div className="nftsRewardsContainer">
                    <div style={{ transform: `translateX(${x}px)` }}>
                        {stakes?.map((e: IFetchedStake, i: any) => {
                            return (
                                <img
                                    key={i}
                                    src={e.displayImage}
                                    alt="nft"
                                    onClick={() => handleMainStakeChange(i)}
                                    style={{
                                        border: `${
                                            i === selectedStakeIndex
                                                ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                : "4px solid rgba(45, 45, 48, 0.4)"
                                        }`,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div> */}
            </div>
        </div>
    );
};
