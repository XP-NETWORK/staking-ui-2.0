import Web3 from "web3";
import { EVMContract, EVMStakeContract } from "./Consts";
import axios from "axios";
const web3 = new Web3(
    Web3.givenProvider || "https://bsc-dataseed.binance.org/"
);

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

                const tokenDetails = await getStakeById(Number(tokenId));
                allKeysInfo = tokenDetails?.info;
                const nft = await axios.get(
                    `https://staking-api.xp.network/staking-nfts/${tokenId}/image`
                );
                // const infoKeys = Object.keys(allKeysInfo).filter((e: string) =>
                //     e.match(/^([^0-9]*)$/)
                // );
                const image = nft?.data.image;
                tokensArr.push({ image, ...allKeysInfo });
            } catch (error) {
                console.log(error);
            }
        }
    }
    return tokensArr;
};
