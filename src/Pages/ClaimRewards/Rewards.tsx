import React, { useEffect, useState } from "react";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import classNames from "classnames";
import ClipboardCopy from "../../Components/ClipboardCopy/ClipboardCopy.tsx";

interface Props {
    stakes: [] | undefined;
}

export const NFTRewards = ({ stakes }: Props) => {
    const [mainStake, setMainStake] = useState({
        nftTokenId: 0,
        image: "",
    });
    console.log(
        "🚀 ~ file: Rewards.tsx ~ line 15 ~ Rewards ~ mainImage",
        mainStake
    );

    const handleSwap = (next: boolean) => {
        switch (next) {
            case true:
                console.log("left");
                break;
            case false:
                console.log("right");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (stakes && stakes?.length > 0) {
            // const st =  stakes[0]
        }
    }, []);

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
                    <img src={mainStake.image} alt="NFT" className="imgMain" />
                    <button
                        className="btnWrap"
                        onClick={() => handleSwap(true)}
                    >
                        <img src={right} alt="right" />
                    </button>
                </div>
                <ClipboardCopy text={mainStake.image} />
                <div className="nftsRewardsContainer">
                    <div>
                        {stakes?.map((e: any) => {
                            return (
                                <img
                                    key={e.nftTokenId}
                                    src={e.image}
                                    alt="nft"
                                    onClick={() => setMainStake(e)}
                                    style={{
                                        border: `${
                                            e.nftTokenId ===
                                            mainStake.nftTokenId
                                                ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                : "4px solid rgba(45, 45, 48, 0.4)"
                                        }`,
                                    }}
                                />
                            );
                        })}
                        {/* <img
                            src="https://nfts.xp.network/415.png"
                            alt="nft"
                            // onClick={() => setMainImgSrc(NFT)}
                            // style={{
                            //     border: `${
                            //         mainImgSrc === NFT
                            //             ? " 4px solid rgba(229, 232, 240, 0.1)"
                            //             : "4px solid rgba(45, 45, 48, 0.4)"
                            //     }`,
                            // }}
                        />
                        <img
                            src="https://nfts.xp.network/415.png"
                            alt="nft"
                            // onClick={() => setMainImgSrc(NFT)}
                            // style={{
                            //     border: `${
                            //         mainImgSrc === NFT
                            //             ? " 4px solid rgba(229, 232, 240, 0.1)"
                            //             : "4px solid rgba(45, 45, 48, 0.4)"
                            //     }`,
                            // }}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
