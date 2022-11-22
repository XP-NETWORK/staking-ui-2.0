import Web3 from "web3";
import { EVMContract, EVMStakeContract } from "./Consts";

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
        const tokensAmount = await EVMStakeContract.methods
            .balanceOf(address)
            .call();
        return tokensAmount;
        // return tokensAmount;
    } catch (error) {
        console.log(error);
    }
};
