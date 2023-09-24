import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getCurrentPrice } from "../../assets/ts/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { ReduxState } from "../../store/store";
import { HOCClaimRewards } from "./HOCClaimRewards";
import "./claimRewards.scss";
// import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";
import { useDispatch } from "react-redux";
import {
    setBalance,
    setErrorModal,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";

import { getXpNetBalance } from "../../assets/ts/algoUtils";

import { WavesLoader } from "../../Components/Loaders/WavesLoader";
import { ClaimAlgorand } from "./ClaimAlgorand";
import { ClaimEVM } from "./ClaimEVM";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [indexOfStake, setIndexOfStake] = useState(0);
    const [indexOfAlgoStake, setIndexOfAlgoStake] = useState(0);
    const [carouselMoveNext, setCarouselMoveNext] = useState<
        undefined | boolean
    >(undefined);

    const {
        account,
        evmAccount,
        evmStakesArray,
        fetchedAlgoStakes,
        algoRewards,
        activeSessionStakes,
        blockchain,
        evmStakes,
        stakingClient,

        tableAlgoSTakeIndex,
    } = useSelector((state: ReduxState) => state.homePage);

    const showLoader = () => {
        switch (blockchain.chain) {
            case "BSC":
                if (evmAccount) {
                    if (evmStakesArray.length > 0) return false;
                    else return true;
                }
                break;
            case "Algorand":
                if (account) {
                    if (fetchedAlgoStakes.length > 0 && algoRewards.length > 0)
                        return false;
                    else return true;
                }
                break;
            default:
                break;
        }

        if (
            (fetchedAlgoStakes.length > 0 && algoRewards.length > 0) ||
            evmStakesArray.length > 0
        ) {
            return false;
        } else return true;
    };

    useEffect(() => {
        if (!Object.keys(stakingClient).length) return;
        const getBalance = async () => {
            const balance = await getXpNetBalance(stakingClient);
            if (balance) dispatch(setBalance(balance));
        };
        if (account) {
            getBalance().catch(console.error);
        }
    }, [stakingClient, activeSessionStakes, account]);

    useEffect(() => {
        const t = setTimeout(() => {
            // debugger;
            switch (blockchain.chain) {
                case "BSC":
                    if (evmStakesArray.length === 0) {
                        navigate("/");
                        dispatch(setErrorModal("evmError"));
                    }
                    break;
                case "Algorand":
                    if (fetchedAlgoStakes.length === 0) {
                        navigate("/");
                        dispatch(setErrorModal(true));
                    }
                    break;
                default:
                    break;
            }
        }, 10000);
        return () => clearTimeout(t);
    }, [blockchain, evmStakesArray, fetchedAlgoStakes, navigate]);

    useEffect(() => {
        const getCurrency = async () => {
            const currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
        };
        getCurrency().catch(console.error);
    }, [chain, evmAccount, evmStakes]);

    useEffect(() => {
        const tableIndex = tableAlgoSTakeIndex;
        // debugger;
        if (tableIndex !== indexOfAlgoStake) {
            if (tableIndex > 3) {
                setIndexOfAlgoStake(tableAlgoSTakeIndex);
                setCarouselMoveNext(true);
            } else {
                setIndexOfAlgoStake(tableAlgoSTakeIndex);
                setCarouselMoveNext(false);
            }
        }
    }, [tableAlgoSTakeIndex]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
    return !showLoader() ? (
        <div className="stakeWrapper">
            {chain === "Algorand" ? (
                <ClaimAlgorand
                    indexOfAlgoStake={indexOfAlgoStake}
                    setIndexOfAlgoStake={setIndexOfAlgoStake}
                    carouselMoveNext={carouselMoveNext}
                    setCarouselMoveNext={setCarouselMoveNext}
                />
            ) : (
                <ClaimEVM
                    setIndexOfStake={setIndexOfStake}
                    indexOfStake={indexOfStake}
                />
            )}
        </div>
    ) : (
        <div className="claim-rewards-loader">
            <WavesLoader />
        </div>
    );
};

export default HOCClaimRewards(ClaimRewards);
