import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Staking extends bkr.ApplicationClient {
    desc: string =
        "Main application that handles creation of the sub app and asset and calls it";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({
            name: "initialize",
            desc: "Called when the application is created, smart contract is deployed.",
            args: [
                { type: "uint64", name: "minClaimPeriod", desc: "" },
                { type: "asset", name: "token", desc: "" },
                { type: "uint64", name: "duration", desc: "" },
                { type: "uint64", name: "multiplier", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "getEarned",
            desc: "Computes the earned amount thus far by the address\n@param account_ account to get the earned ammount for",
            args: [
                { type: "address", name: "address", desc: "" },
                { type: "uint64", name: "lockTime", desc: "" },
                { type: "uint64", name: "stakeId", desc: "" },
            ],
            returns: { type: "uint64", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "stake",
            desc: "Staking function\n@param amount_ the amount to stake @param lockTime_ the lock time to lock the stake for",
            args: [
                { type: "axfer", name: "axfer", desc: "" },
                { type: "uint64", name: "lockTime_", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "unstake",
            desc: "@param stakeId_ the stake id to unstake",
            args: [
                { type: "uint64", name: "stakeId", desc: "" },
                { type: "asset", name: "token", desc: "" },
                { type: "application", name: "app", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "getReward",
            desc: "The function called to get the reward for all the user stakes",
            args: [
                { type: "asset", name: "token", desc: "" },
                { type: "uint64", name: "lockTime", desc: "" },
                { type: "application", name: "app", desc: "" },
                { type: "uint64", name: "stakeId", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "setStakingEnabled",
            desc: "@dev Sets the staking enabled flag\n@param stakingEnabled_ weather or not staking should be enabled",
            args: [{ type: "string", name: "stakingEnabled_", desc: "" }],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "get_balance_addr",
            desc: "Gets the balance of the asset of the transaction sender",
            args: [{ type: "asset", name: "token", desc: "" }],
            returns: { type: "uint64", desc: "" },
        }),
    ];
    async initialize(
        args: {
            minClaimPeriod: bigint;
            token: bigint;
            duration: bigint;
            multiplier: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.initialize(
                {
                    minClaimPeriod: args.minClaimPeriod,
                    token: args.token,
                    duration: args.duration,
                    multiplier: args.multiplier,
                },
                txnParams
            )
        );
        return new bkr.ABIResult<void>(result);
    }
    async getEarned(
        args: {
            address: string;
            lockTime: bigint;
            stakeId: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(
            await this.compose.getEarned(
                {
                    address: args.address,
                    lockTime: args.lockTime,
                    stakeId: args.stakeId,
                },
                txnParams
            )
        );
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async stake(
        args: {
            axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            lockTime_: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.stake(
                { axfer: args.axfer, lockTime_: args.lockTime_ },
                txnParams
            )
        );
        return new bkr.ABIResult<void>(result);
    }
    async unstake(
        args: {
            stakeId: bigint;
            token: bigint;
            app: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.unstake(
                { stakeId: args.stakeId, token: args.token, app: args.app },
                txnParams
            )
        );
        return new bkr.ABIResult<void>(result);
    }
    async getReward(
        args: {
            token: bigint;
            lockTime: bigint;
            app: bigint;
            stakeId: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.getReward(
                {
                    token: args.token,
                    lockTime: args.lockTime,
                    app: args.app,
                    stakeId: args.stakeId,
                },
                txnParams
            )
        );
        return new bkr.ABIResult<void>(result);
    }
    async setStakingEnabled(
        args: {
            stakingEnabled_: string;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.setStakingEnabled(
                { stakingEnabled_: args.stakingEnabled_ },
                txnParams
            )
        );
        return new bkr.ABIResult<void>(result);
    }
    async get_balance_addr(
        args: {
            token: bigint;
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(
            await this.compose.get_balance_addr(
                { token: args.token },
                txnParams
            )
        );
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    compose = {
        initialize: async (
            args: {
                minClaimPeriod: bigint;
                token: bigint;
                duration: bigint;
                multiplier: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "initialize"),
                {
                    minClaimPeriod: args.minClaimPeriod,
                    token: args.token,
                    duration: args.duration,
                    multiplier: args.multiplier,
                },
                txnParams,
                atc
            );
        },
        getEarned: async (
            args: {
                address: string;
                lockTime: bigint;
                stakeId: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "getEarned"),
                {
                    address: args.address,
                    lockTime: args.lockTime,
                    stakeId: args.stakeId,
                },
                txnParams,
                atc
            );
        },
        stake: async (
            args: {
                axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
                lockTime_: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "stake"),
                { axfer: args.axfer, lockTime_: args.lockTime_ },
                txnParams,
                atc
            );
        },
        unstake: async (
            args: {
                stakeId: bigint;
                token: bigint;
                app: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "unstake"),
                { stakeId: args.stakeId, token: args.token, app: args.app },
                txnParams,
                atc
            );
        },
        getReward: async (
            args: {
                token: bigint;
                lockTime: bigint;
                app: bigint;
                stakeId: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "getReward"),
                {
                    token: args.token,
                    lockTime: args.lockTime,
                    app: args.app,
                    stakeId: args.stakeId,
                },
                txnParams,
                atc
            );
        },
        setStakingEnabled: async (
            args: {
                stakingEnabled_: string;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "setStakingEnabled"),
                { stakingEnabled_: args.stakingEnabled_ },
                txnParams,
                atc
            );
        },
        get_balance_addr: async (
            args: {
                token: bigint;
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "get_balance_addr"),
                { token: args.token },
                txnParams,
                atc
            );
        },
    };
}
