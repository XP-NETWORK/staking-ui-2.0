import Web3 from "web3";
import { EVMContract, EVMStakeContract } from "./Consts";
import axios from "axios";
import moment from "moment";
const web3 = new Web3(
    Web3.givenProvider || "https://bsc-dataseed.binance.org/"
);

export const convertFromWei = (wei: string) => {
    return parseInt(Web3.utils.fromWei(wei, "ether"));
};

export const getEvmXpNetBalance = async (address: string) => {
    let weiBalance: string;

    try {
        weiBalance = await EVMContract.methods.balanceOf(address).call();
        const balance = parseInt(Web3.utils.fromWei(weiBalance, "ether"));
        console.log({ balance });
    } catch (error) {
        console.log(error);
    }
};

export const getAmountOfEVMTokensStaked = async (address: string) => {
    try {
        const stakes = await EVMStakeContract.methods
            .balanceOf("0xa796A5a95a1dDEF1d557d38DF9Fe86dc2b204D63")
            .call();
        return Number(stakes) || undefined;
    } catch (error) {
        console.log(error);
    }
};

export const getStakeById = async (id: number) => {
    try {
        const info = await EVMStakeContract.methods.stakes(id).call();
        const isUnlocked = await EVMStakeContract.methods
            .checkIsUnlocked(id)
            .call();
        return { info, isUnlocked };
    } catch (error) {
        console.log(error);
    }
};

export const showAvailableRewards = async (nftTokenIdId: string) => {
    try {
        const available = await EVMStakeContract.methods
            .showAvailableRewards(nftTokenIdId)
            .call();
        return available;
    } catch (error) {
        console.log(error);
    }
};

export const getTokenOfOwnerByIndex = async (
    tokenAmount: number,
    owner: string
) => {
    let tokensArr = [];
    let allKeysInfo: any;

    if (tokenAmount) {
        const num = tokenAmount;
        for (let i = 0; i < num; i++) {
            try {
                const tokenId = await EVMStakeContract.methods
                    .tokenOfOwnerByIndex(
                        "0xa796A5a95a1dDEF1d557d38DF9Fe86dc2b204D63",
                        i
                    )
                    .call();
                const availableRewards = await showAvailableRewards(tokenId);
                const tokenDetails = await getStakeById(Number(tokenId));
                allKeysInfo = tokenDetails?.info;
                const nft = await axios.get(
                    `https://staking-api.xp.network/staking-nfts/${tokenId}/image`
                );
                const image = nft?.data.image;
                tokensArr.push({ image, ...allKeysInfo, availableRewards });
            } catch (error) {
                console.log(error);
            }
        }
    }
    return tokensArr;
};

export const evmAPY = (period: string) => {
    if (period === "7776000") return 45;
    else if (period === "15552000") return 75;
    else if (period === "23328000") return 100;
    else if (period === "31536000") return 125;
    else return 0;
};

export const getStartDate = (date: string) => {
    const seconds = parseInt(date);
    const startDate = moment.unix(seconds).format("YYYY-MM-DD HH:MM");
    return startDate;
};

export const getEVMStakeEndDate = (period: string, date: string) => {
    const startDate = getStartDate(date);
    let expDate: any;
    if (period === "7776000") {
        expDate = moment(startDate).add(3, "month").format("YYYY-MM-DD hh:mm");
    } else if (period === "15552000") {
        expDate = moment(startDate).add(6, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "23328000") {
        expDate = moment(startDate).add(9, "month").format("YYYY-MM-DD HH:MM");
    } else if (period === "31536000") {
        expDate = moment(startDate).add(1, "year").format("YYYY-MM-DD HH:MM");
    }
    return expDate;
};

export const getEVMStakeProgress = (seconds: string, start: string) => {
    const dayNow = Math.floor(Date.now() / 1000);
    const daysDuration = Number(seconds);
    const daysPassed = dayNow - Number(start);
    return (daysPassed / daysDuration) * 100;
};

export const claimXpNetRewards = async (
    nftId: string,
    rewards: string,
    owner: string
) => {
    try {
        await EVMStakeContract.methods
            .withdrawRewards(nftId, rewards)
            .send({ from: owner })
            .once("receipt", (e: any) => {
                console.log(e);
            })
            .on("error", (error: any) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};

export const unstakeEVMStake = async (nftId: string, address: string) => {
    // debugger
    try {
        await EVMStakeContract.methods
            .withdraw(nftId)
            .send({ from: address })
            .once("receipt", (e: any) => {
                console.log(e);
            })
            .on("error", (error: any) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};

export const totalSupply = async (index: number, length: number) => {
    // debugger

    try {
        const allStakes = await EVMStakeContract.methods.totalSupply().call();
        console.log({ allStakes });

        // const array = (
        //     await Promise.all(
        //         new Array(length)
        //             .fill(0)
        //             .map((n, i) => i + index)
        //             .map(async (n) => {
        //                 const res = (
        //                     await axios.get(
        //                         `https://staking-api.xp.network/staking-nfts/${n}/image`
        //                     )
        //                 ).data;
        //                 const nft = await EVMStakeContract.methods.stakes(n).call();
        //                 return { nft, ...res };
        //             })
        //     )
        // ).map((n, i) => ({
        //     url: n.image,
        //     token: i + index,
        //     staker: n.nft[5],
        //     period: n.nft[2],
        //     amount: n.nft[0],
        // }));
    } catch (error) {
        console.log(error);
    }
};
