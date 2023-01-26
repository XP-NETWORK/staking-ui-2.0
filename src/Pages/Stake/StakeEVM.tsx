import React, { FC, useState } from "react";
import Web3 from "web3";
import { TestnetStake, TestnetToken } from "../../assets/ts/Consts";
import {
    claimXpNetRewards,
    getAmountOfEVMTokensStaked,
    getStakeById,
    showAvailableRewards,
    unstakeEVMStake,
} from "../../assets/ts/evmUtils";
import { connectMetaMask } from "../../Components/Wallets/walletConnectors";

interface Props {}

export const StakeEVM: FC<Props> = ({}) => {
    const [account, setAccount] = useState();
    const [amount, setAmount] = useState<number | undefined>();
    const [_stake, setStake] = useState<any[]>();
    const [id, setId] = useState<string>();
    const [rewards, setRewards] = useState();

    const connectMM = async () => {
        const response: any = await connectMetaMask();
        const { accounts } = response;
        setAccount(accounts[0]);
    };

    const stake = async () => {
        TestnetStake.methods
            .stake("1500000000000000000000", 7776000)
            .send({ from: account })
            .once("receipt", async function (receipt: any) {
                console.log(receipt);
            })
            .on("error", () => {})
            .catch((error: any) => {
                console.log(error);
            });
    };

    const approve = async () => {
        debugger;
        await TestnetToken.methods
            .approve(
                process.env.REACT_APP_TESTNET_STAKING,
                "10000000000000000000000000000000000000000000000000"
            )
            .send({ from: account })
            .once("receipt", async function (receipt: any) {
                console.log(receipt);
            })
            .on("error", () => {})
            .catch((error: any) => {
                console.log(error);
            });
    };

    const stakesAmount = async () => {
        const amount = await getAmountOfEVMTokensStaked(
            account || "0xb6C8748115d23Eb1c6d59Cb83eAe051b56ef75c7",
            TestnetStake
        );
        setAmount(amount);
    };

    const getStake = async () => {
        const s = await getStakeById(Number(id), TestnetStake);
        const info = s?.info;
        const values = Object.values(info);
        setStake(values);
    };

    const getRewards = async () => {
        if (id) {
            const r = await showAvailableRewards(id, TestnetStake);
            setRewards(r);
        }
    };

    const claimRewards = async () => {
        if (id && rewards && account) {
            const claimed = await claimXpNetRewards(id, rewards, account);
            console.log(claimed);
        }
    };

    const unstake = async () => {
        if (id && account) {
            unstakeEVMStake(id, account, TestnetStake);
        }
    };

    return (
        <div>
            <div onClick={() => connectMM()}>Connect Metamask</div>
            <div>{account}</div>
            <hr />
            <div onClick={approve}>Approve</div>
            <hr />
            <div onClick={stake}>STAKE</div>
            {/* <div>{receipt}</div> */}
            <hr />
            <div onClick={stakesAmount}>Get Amount Of Tokens Staked</div>
            <div>{amount}</div>
            <br />
            <hr />
            <div onClick={getStake}>Get Stake</div>
            <div>
                {_stake?.map((e) => (
                    <div>{e}</div>
                ))}
            </div>
            <br />
            <hr />
            <input type="text" onChange={(e) => setId(e.target.value)} />
            <div onClick={getRewards}>Get Rewards</div>
            <div>{rewards}</div>
            <hr />
            <div onClick={claimRewards}>Claim Rewards</div>
            <br />
            <hr />
            <div onClick={unstake}>Unstake</div>
        </div>
    );
};
