import Web3 from "web3";
import { EVMContract, EVMStakeContract, bsc_staking } from "./Consts";
import axios from "axios";
import moment from "moment";
import { PublicClient } from "wagmi";
import stakerABI from "../../ABI/xpNetStaker.json";
import { BigNumber } from "ethers";
import { WalletClient } from "wagmi";
import { bsc } from "wagmi/chains";

// REACT_APP_ALGO_SERVICE

export const convertFromWei = (wei: string) => {
    const n = wei ? parseInt(Web3.utils.fromWei(wei, "ether")) : 0;
    return n;
};
export const getEvmXpNetBalance = async (
    address: `0x${string}`,
    //@ts-ignore
    wallectConnect: PublicClient | undefined
) => {
    let weiBalance: string;

    try {
        weiBalance = wallectConnect
            ? await wallectConnect.getBalance({ address })
            : await EVMContract.methods.balanceOf(address).call();

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
    if (!contract) {
        try {
            const stakes = await EVMStakeContract.methods
                .balanceOf(address)
                .call();
            console.log(stakes, "stakes");
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

export const getStakeById = async (
    id: number,
    wallectConnect?: PublicClient | undefined
) => {
    if (wallectConnect) {
        const info = (await wallectConnect.readContract({
            address: bsc_staking,
            abi: stakerABI,
            functionName: "stakes",
            //@ts-ignore
            args: [id.toString()],
        })) as any;

        const isUnlocked = await wallectConnect.readContract({
            address: bsc_staking,
            abi: stakerABI,
            functionName: "checkIsUnlocked",
            //@ts-ignore
            args: [id.toString()],
        });

        return {
            info: {
                amount: BigNumber.from(info[0]).toString(),
                nftTokenId: BigNumber.from(info[1]).toString(),
                lockInPeriod: BigNumber.from(info[2]).toString(),
                rewardWithdrawn: BigNumber.from(info[3]).toString(),
                startTime: BigNumber.from(info[4]).toString(),
                staker: BigNumber.from(info[5]).toString(),
                correction: BigNumber.from(info[6]).toString(),
                isActive: Boolean(info[7]),
                stakeWithdrawn: Boolean(info[8]),
            },
            isUnlocked,
        };
    }

    const contract = EVMStakeContract;
    try {
        const info = await contract.methods.stakes(id).call();

        const isUnlocked = await contract.methods.checkIsUnlocked(id).call();
        return { info, isUnlocked };
    } catch (error) {
        console.log(error);
    }
};

export const showAvailableRewards = async (
    nftTokenIdId: string,
    wallectConnect?: PublicClient | undefined
) => {
    if (wallectConnect) {
        const x = await wallectConnect.readContract({
            address: bsc_staking,
            abi: stakerABI,
            functionName: "showAvailableRewards",
            //@ts-ignore
            args: [nftTokenIdId],
        });

        return BigNumber.from(x).toString();
    }

    // debugger;
    const contract = EVMStakeContract;
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
    _: string,
    wallectConnect: PublicClient | undefined
) => {
    const tokensArr = [];
    let allKeysInfo: any;

    if (tokenAmount) {
        const num = tokenAmount;
        for (let i = 0; i < num; i++) {
            try {
                const tokenId = i.toString();

                const availableRewards = await showAvailableRewards(
                    tokenId,
                    wallectConnect
                );

                const isUnlocked = await checkIsUnLocked(
                    +tokenId,
                    wallectConnect
                );
                const tokenDetails = await getStakeById(
                    +tokenId,
                    wallectConnect
                );

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
    wallectConnect?: WalletClient | undefined
) => {
    try {
        if (wallectConnect) {
            //@ts-ignore
            const x = await wallectConnect.writeContract({
                address: bsc_staking,
                abi: stakerABI,
                chain: bsc,
                functionName: "withdraw",
                args: [nftId as any],
            });

            return x;
        }

        const contract = EVMStakeContract;
        await contract.methods
            .withdraw(nftId)
            .send({ from: address })
            .once("receipt", (e: any) => {
                console.log(e);
            })
            .on("error", (error: any) => {
                console.log(error);
            });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const claimXpNet = async (
    nftId: string,
    rewards: string,
    account: string,
    wallectConnect?: WalletClient | undefined
) => {
    try {
        if (wallectConnect) {
            //@ts-ignore
            const x = await wallectConnect.writeContract({
                address: bsc_staking,
                abi: stakerABI,
                chain: bsc,
                functionName: "withdrawRewards",
                args: [nftId as any, rewards as any],
            });

            return x;
        }

        await EVMStakeContract.methods
            .withdrawRewards(nftId, rewards)
            .send({ from: account })
            .once("receipt", (e: any) => {
                console.log(e);
            })
            .on("error", (error: any) => {
                console.log(error);
            });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const totalSupply = async () => {
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

export const checkIsUnLocked = async (
    id: number,
    wallectConnect?: PublicClient | undefined
) => {
    if (wallectConnect) {
        return await wallectConnect.readContract({
            address: bsc_staking,
            abi: stakerABI,
            functionName: "checkIsUnlocked",
            //@ts-ignore
            args: [id.toString()],
        });
    }

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
