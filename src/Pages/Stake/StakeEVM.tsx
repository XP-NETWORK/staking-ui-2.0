import React, { FC, useState } from "react";

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

export const StakeEVM: FC<Props> = () => {
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
            .stake("1500000000000000000000", 60)
            .send({ from: account })
            .once("receipt", async function (receipt: any) {
                console.log(receipt);
            })
            .on("error", (e: any) => console.log(e, "e"))
            .catch((error: any) => {
                console.log(error);
            });
    };

    const approve = async () => {
        await TestnetToken.methods
            .approve(
                process.env.REACT_APP_TESTNET_STAKING,
                "15000000000000000000000"
            )
            .send({ from: account })
            .once("receipt", async function (receipt: any) {
                console.log(receipt);
            })
            .on("error", (e: any) => console.log(e, "e"))
            .catch((error: any) => {
                console.log(error);
            });
    };

    const stakesAmount = async () => {
        const amount =
            account &&
            (await getAmountOfEVMTokensStaked(account, TestnetStake));
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
        <div className="evmStakeWrapper">
            <button onClick={() => connectMM()}>Connect Metamask</button>
            <div>{account}</div>
            <hr />
            <button onClick={approve}>Approve</button>
            <hr />
            <button onClick={stake}>STAKE</button>
            {/* <div>{receipt}</div> */}
            <hr />
            <button onClick={stakesAmount}>Get Amount Of Tokens Staked</button>
            <div>{amount}</div>
            <br />
            <hr />
            <button onClick={getStake}>Get Stake</button>
            <div>
                {_stake?.map((e) => (
                    <div>{e}</div>
                ))}
            </div>
            <br />
            <hr />
            <input type="text" onChange={(e) => setId(e.target.value)} />
            <button onClick={getRewards}>Get Rewards</button>
            <div>{rewards}</div>
            <hr />
            <button onClick={claimRewards}>Claim Rewards</button>
            <br />
            <hr />
            <button onClick={unstake}>Unstake</button>
        </div>
    );
};
