import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Staking extends bkr.ApplicationClient {
    desc: string = "";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "initialize", desc: "", args: [{ type: "address", name: "stakingTokenAddress", desc: "" }, { type: "address", name: "communityAddress", desc: "" }, { type: "uint64", name: "minClaimPeriod", desc: "" }, { type: "uint64", name: "rewardRate", desc: "" }, { type: "asset", name: "token", desc: "" }, { type: "uint64", name: "duration", desc: "" }, { type: "uint64", name: "multiplier", desc: "" }, { type: "uint64", name: "maxLoss", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "addRewardPool", desc: "", args: [{ type: "axfer", name: "axfer", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "getRewardPerToken", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "getEarned", desc: "", args: [{ type: "address", name: "address", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "stake", desc: "", args: [{ type: "axfer", name: "axfer", desc: "" }, { type: "uint64", name: "lockTime_", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "unstake", desc: "", args: [{ type: "uint64", name: "stakeId", desc: "" }, { type: "asset", name: "token", desc: "" }, { type: "application", name: "app", desc: "" }, { type: "account", name: "clawback", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "getReward", desc: "", args: [{ type: "asset", name: "token", desc: "" }, { type: "application", name: "app", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "setStakingEnabled", desc: "", args: [{ type: "string", name: "stakingEnabled_", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "setCommunityAddress", desc: "", args: [{ type: "address", name: "communityAddress", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_balance_addr", desc: "", args: [{ type: "asset", name: "token", desc: "" }], returns: { type: "uint64", desc: "" } })
    ];
    async initialize(args: {
        stakingTokenAddress: string;
        communityAddress: string;
        minClaimPeriod: bigint;
        rewardRate: bigint;
        token: bigint;
        duration: bigint;
        multiplier: bigint;
        maxLoss: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.initialize({ stakingTokenAddress: args.stakingTokenAddress, communityAddress: args.communityAddress, minClaimPeriod: args.minClaimPeriod, rewardRate: args.rewardRate, token: args.token, duration: args.duration, multiplier: args.multiplier, maxLoss: args.maxLoss }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async addRewardPool(args: {
        axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.addRewardPool({ axfer: args.axfer }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async getRewardPerToken(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.getRewardPerToken(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async getEarned(args: {
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.getEarned({ address: args.address }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async stake(args: {
        axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        lockTime_: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.stake({ axfer: args.axfer, lockTime_: args.lockTime_ }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async unstake(args: {
        stakeId: bigint;
        token: bigint;
        app: bigint;
        clawback: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.unstake({ stakeId: args.stakeId, token: args.token, app: args.app, clawback: args.clawback }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async getReward(args: {
        token: bigint;
        app: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.getReward({ token: args.token, app: args.app }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async setStakingEnabled(args: {
        stakingEnabled_: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setStakingEnabled({ stakingEnabled_: args.stakingEnabled_ }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async setCommunityAddress(args: {
        communityAddress: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setCommunityAddress({ communityAddress: args.communityAddress }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_balance_addr(args: {
        token: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_balance_addr({ token: args.token }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    compose = {
        initialize: async (args: {
            stakingTokenAddress: string;
            communityAddress: string;
            minClaimPeriod: bigint;
            rewardRate: bigint;
            token: bigint;
            duration: bigint;
            multiplier: bigint;
            maxLoss: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "initialize"), { stakingTokenAddress: args.stakingTokenAddress, communityAddress: args.communityAddress, minClaimPeriod: args.minClaimPeriod, rewardRate: args.rewardRate, token: args.token, duration: args.duration, multiplier: args.multiplier, maxLoss: args.maxLoss }, txnParams, atc);
        },
        addRewardPool: async (args: {
            axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "addRewardPool"), { axfer: args.axfer }, txnParams, atc);
        },
        getRewardPerToken: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "getRewardPerToken"), {}, txnParams, atc);
        },
        getEarned: async (args: {
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "getEarned"), { address: args.address }, txnParams, atc);
        },
        stake: async (args: {
            axfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            lockTime_: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "stake"), { axfer: args.axfer, lockTime_: args.lockTime_ }, txnParams, atc);
        },
        unstake: async (args: {
            stakeId: bigint;
            token: bigint;
            app: bigint;
            clawback: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "unstake"), { stakeId: args.stakeId, token: args.token, app: args.app, clawback: args.clawback }, txnParams, atc);
        },
        getReward: async (args: {
            token: bigint;
            app: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "getReward"), { token: args.token, app: args.app }, txnParams, atc);
        },
        setStakingEnabled: async (args: {
            stakingEnabled_: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setStakingEnabled"), { stakingEnabled_: args.stakingEnabled_ }, txnParams, atc);
        },
        setCommunityAddress: async (args: {
            communityAddress: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setCommunityAddress"), { communityAddress: args.communityAddress }, txnParams, atc);
        },
        get_balance_addr: async (args: {
            token: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_balance_addr"), { token: args.token }, txnParams, atc);
        }
    };
}
