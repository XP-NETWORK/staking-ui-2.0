import Web3 from "web3";
import { EVMContract, EVMStakeContract } from "./Consts";
import axios from "axios";
import moment from "moment";

// REACT_APP_ALGO_SERVICE

const web3 = new Web3(
    Web3.givenProvider || "https://bsc-dataseed.binance.org/"
);

export const convertFromWei = (wei: string) => {
    const n = wei ? parseInt(Web3.utils.fromWei(wei, "ether")) : 0;
    return n;
};

export const getEvmXpNetBalance = async (address: string, contract?: any) => {
    let weiBalance: string;

    try {
        weiBalance =
            // contract
            //     ? await contract.methods.balanceOf(address).call()
            //     :
            await EVMContract.methods.balanceOf(address).call();
        const balance = parseInt(Web3.utils.fromWei(weiBalance, "ether"));
        return balance;
    } catch (error) {
        console.log(error);
    }
};

export const getAmountOfEVMTokensStaked = async (
    address: string,
    contract?: any
) => {
    // debugger;
    if (!contract) {
        try {
            const stakes = await EVMStakeContract.methods
                .balanceOf(address)
                .call();
            return Number(stakes) || undefined;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const stakes = await contract.methods.balanceOf(address).call();
            return Number(stakes) || undefined;
        } catch (error) {
            console.log(error);
        }
    }
};

export const getStakeById = async (id: number, c?: any) => {
    // debugger;
    const contract = c || EVMStakeContract;
    try {
        const info = await contract.methods.stakes(id).call();
        const isUnlocked = await contract.methods.checkIsUnlocked(id).call();
        return { info, isUnlocked };
    } catch (error) {
        console.log(error);
    }
};

export const showAvailableRewards = async (nftTokenIdId: string, c?: any) => {
    // debugger;
    const contract = c || EVMStakeContract;
    try {
        const available = await contract.methods
            .showAvailableRewards(nftTokenIdId)
            .call();
        return available;
    } catch (error) {
        console.log(error);
    }
};

export const getTokenOfOwnerByIndex = async (
    tokenAmount: number,
    owner: string,
    contract?: any
) => {
    let tokensArr = [];
    let allKeysInfo: any;
    // "0xa796A5a95a1dDEF1d557d38DF9Fe86dc2b204D63"
    if (tokenAmount) {
        const num = tokenAmount;
        for (let i = 0; i < num; i++) {
            try {
                const tokenId = contract;
                // ? await contract.methods
                //       .tokenOfOwnerByIndex(owner, i)
                //       .call()
                // :
                await EVMStakeContract.methods
                    .tokenOfOwnerByIndex(owner, i)
                    .call();
                const availableRewards = await showAvailableRewards(tokenId);
                const isUnlocked = await checkIsUnLocked(tokenId);
                const tokenDetails = await getStakeById(Number(tokenId));
                allKeysInfo = tokenDetails?.info;
                const nft = await axios.get(
                    `https://staking-api.xp.network/staking-nfts/${tokenId}/image`
                );
                const image = nft?.data.image;
                tokensArr.push({
                    image,
                    ...allKeysInfo,
                    availableRewards,
                    isUnlocked,
                });
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
    debugger;
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

export const unstakeEVMStake = async (
    nftId: string,
    address: string,
    c?: any
) => {
    debugger;
    const contract = c || EVMStakeContract;
    try {
        await contract.methods
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

export const claimXpNet = async (
    nftId: string,
    rewards: string,
    account: string
) => {
    // store.dispatch(updateWithdrawed(true))
    try {
        await EVMStakeContract.methods
            .withdrawRewards(nftId, rewards)
            .send({ from: account })
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

export const checkIsUnLocked = async (id: number) => {
    // debugger
    try {
        const isUnlocked = await EVMStakeContract.methods
            .checkIsUnlocked(id)
            .call();
        console.log(`id: ${id} isUnlocked: ${isUnlocked}`);
        return isUnlocked;
    } catch (error) {
        console.log(error);
    }
};
