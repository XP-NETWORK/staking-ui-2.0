import classNames from "classnames";
import { IFetchedStake } from "../../assets/ts/Consts";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import ClipboardCopy from "../ClipboardCopy/ClipboardCopy.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { getAllNFTsByOwner } from "../../assets/ts/algoUtils";
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
    const [x, setX] = useState(0);

    const { account } = useSelector((state: ReduxState) => state.homePage);

    useEffect(() => {
        if (account) {
            getAllNFTsByOwner(account);
        }
    }, []);

    const handleSwap = (next: boolean) => {
        // debugger;
        switch (next) {
            case false:
                if (selectedStakeIndex !== 0) {
                    if (selectedStakeIndex <= 3) {
                        setIndex(selectedStakeIndex - 1);
                    } else {
                        setIndex(selectedStakeIndex - 1);
                        setX((prev) => prev + 110);
                    }
                }
                break;
            case true:
                if (selectedStakeIndex !== stakes?.length - 1) {
                    setIndex(selectedStakeIndex + 1);
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
                    <img src="#" alt="NFT" className="imgMain" />
                    <button
                        className="btnWrap"
                        onClick={() => handleSwap(true)}
                    >
                        <img src={right} alt="right" />
                    </button>
                </div>
                <ClipboardCopy stake={stakes[selectedStakeIndex]} />
                <div className="nftsRewardsContainer">
                    <div style={{ transform: `translateX(${x}px)` }}>
                        {stakes?.map((e: any, i: any) => {
                            return (
                                <img
                                    key={i}
                                    src={e.image}
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
                </div>
            </div>
        </div>
    );
};
