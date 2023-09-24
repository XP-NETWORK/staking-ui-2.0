import classNames from "classnames";
import { IFetchedStake } from "../../assets/ts/Consts";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { getAllNFTsByOwner } from "../../assets/ts/algoUtils";
import Carousel from "../Carousel/Carousel";
import CarouselMainItemList from "../Carousel/CarouselMainItemList";
import { useDispatch } from "react-redux";
import {
    setNFTSByOwner,
    setSelectedNFT,
} from "../../store/reducer/homePageSlice";

import AlgoNFTActions from "./AlgoNFTActions";
import { Link } from "react-router-dom";
interface Props {
    stakes: IFetchedStake[];
    setIndex: any;
    selectedStakeIndex: number;
    carouselMoveNext: boolean | undefined;
    setCarouselMoveNext: Function;
}

export const AlgoNFTRewards = ({
    stakes,
    selectedStakeIndex,
    setIndex,
}: Props) => {
    const dispatch = useDispatch();

    // const [mainImageLoaded, setMainImageLoaded] = useState(false);

    const { account, nfts, selectedNFTtxId, fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {
        let getAllNFTsByOwnerInterval: any;
        const nfts = async () => {
            const nfts = await getAllNFTsByOwner(account, stakes);

            dispatch(setNFTSByOwner(nfts));
            if (nfts)
                dispatch(setSelectedNFT(selectedNFTtxId || nfts[0]?.txId));
        };
        if (account) {
            nfts();
        }
        return () => clearInterval(getAllNFTsByOwnerInterval);
    }, [fetchedAlgoStakes, stakes]);

    const handleSwap = (next: boolean | undefined) => {
        // debugger;
        switch (next) {
            case false: {
                const newIdex = selectedStakeIndex - 1;
                if (newIdex > -1) {
                    dispatch(setSelectedNFT(stakes[newIdex].txId));
                    setIndex(newIdex);
                }
                break;
            }
            case true: {
                const newIdex = selectedStakeIndex + 1;
                if (newIdex <= stakes?.length - 1) {
                    setIndex(newIdex);

                    dispatch(setSelectedNFT(stakes[newIdex].txId));
                }
                break;
            }
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
                <div className="containerRight__header">
                    <h1>Your NFT rewards</h1>
                    <h1>
                        <Link
                            className="containerRight__header-button"
                            to="/gallery"
                        >
                            NFT Collection
                        </Link>
                    </h1>
                </div>
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
                            setLoaded={() => {}}
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
                        x={selectedStakeIndex * -110}
                        selectedStakeIndex={selectedStakeIndex}
                        handleMainStakeChange={handleMainStakeChange}
                    />
                </div>
            </div>
        </div>
    );
};
