import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Staking extends bkr.ApplicationClient {
    desc: string = "";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({
            name: "initialize",
            desc: "",
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
            desc: "",
            args: [
                { type: "address", name: "address", desc: "" },
                { type: "uint64", name: "lockTime", desc: "" },
            ],
            returns: { type: "uint64", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "stake",
            desc: "",
            args: [
                { type: "axfer", name: "axfer", desc: "" },
                { type: "uint64", name: "lockTime_", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "unstake",
            desc: "",
            args: [
                { type: "uint64", name: "stakeId", desc: "" },
                { type: "asset", name: "token", desc: "" },
                { type: "application", name: "app", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "getReward",
            desc: "",
            args: [
                { type: "asset", name: "token", desc: "" },
                { type: "uint64", name: "lockTime", desc: "" },
                { type: "application", name: "app", desc: "" },
            ],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "setStakingEnabled",
            desc: "",
            args: [{ type: "string", name: "stakingEnabled_", desc: "" }],
            returns: { type: "void", desc: "" },
        }),
        new algosdk.ABIMethod({
            name: "get_balance_addr",
            desc: "",
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
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(
            await this.compose.getEarned(
                { address: args.address, lockTime: args.lockTime },
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
        },
        txnParams?: bkr.TransactionOverrides
    ): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(
            await this.compose.getReward(
                { token: args.token, lockTime: args.lockTime, app: args.app },
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
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "getEarned"),
                { address: args.address, lockTime: args.lockTime },
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
            },
            txnParams?: bkr.TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, "getReward"),
                { token: args.token, lockTime: args.lockTime, app: args.app },
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
