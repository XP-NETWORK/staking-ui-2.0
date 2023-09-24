import { assetIdx, subAppId } from "../../assets/ts/Consts";

export const some = "";

export const claimXPNet = async (
    client: any,
    account: string,
    algoDetails: any
) => {
    let stakingAmount;
    if (client !== undefined) {
        stakingAmount = await client.getAccountState(account);

        const { dynamic_account_valuetsba } = stakingAmount;
        try {
            const sp = await client.getSuggestedParams();
            sp.flatFee = true;
            sp.fee = 7_000;

            if (dynamic_account_valuetsba > 0) {
                const res = await client.getReward(
                    {
                        token: BigInt(assetIdx),
                        lockTime: BigInt(algoDetails.duration),
                        app: subAppId,
                    },
                    { suggestedParams: sp }
                );
                return res;
            }
        } catch (e) {
            console.error(JSON.parse(JSON.stringify(e)));
        }
    }
};

export const Unstake = async (client: any, amountStake: number) => {
    let rewards;
    if (client !== undefined) {
        try {
            const sp = await client.getSuggestedParams();
            sp.flatFee = true;
            sp.fee = 7_000;

            if (amountStake > 0) {
                rewards = await client.unstake(
                    {
                        stakeId: BigInt(0),
                        token: BigInt(assetIdx),
                        app: subAppId,
                    },
                    { suggestedParams: sp }
                );
                return rewards;
            }
        } catch (e) {
            console.log(e);
        }
    }
};

export const getAlgoStakesAmount = async (client: any, account: string) => {
    if (client !== undefined) {
        try {
            const stakeAmt: any = client
                ? await client
                      .getAccountState(account)
                      .then(
                          (n: any) => Number(n.dynamic_account_valuetsba) / 1e6
                      )
                      .catch(() => 0)
                : 0;
            return stakeAmt;
        } catch {
            return 0;
        }
    }
};

/*export const detAlgoRewards = async (
    client: any,
    account: string,
    algoDetails: any
) => {
    try {
        const rewards: any = await client
            .getEarned({
                address: account,
                lockTime: BigInt(algoDetails.appId),
                //stakeId: 
            })
            .then((n: any) => Number(n.value) / 1e6)
            .catch(() => 0);
        return rewards;
    } catch (error) {
        console.log(error, "error in detAlgoRewards");
    }
};*/
