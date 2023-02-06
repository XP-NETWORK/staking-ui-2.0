import { FC } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { INFT } from "../../assets/ts/Consts";
import {
    addCommas,
    calculateEndDate,
    calculateEstimatedRewards,
    convertSecondsToMonths,
} from "../../assets/ts/helpers";
import icon from "./../../assets/images/treasure.svg";

interface Props {
    stake: any;
    handleClick: any;
    activeSTakeNFT: INFT;
}

export const SuccessTransactionBody: FC<Props> = ({
    stake,
    handleClick,
    activeSTakeNFT,
}) => {
    return (
        <div className="success-txn-body">
            <div className="success-txn-header">
                <img src={icon} alt="" />
                <span>Your $XPNETs are locked </span>
            </div>
            <div className="success-txn__info">
                <div className="success-txn-item">
                    <span className="success-item-label">You staked</span>
                    <span className="success-item-value">
                        {stake && `${addCommas(stake.amount)} XPNET`}
                    </span>
                </div>
                <div className="success-txn-item">
                    <span className="success-item-label">End date</span>
                    <span className="success-item-value">
                        {calculateEndDate(
                            convertSecondsToMonths(stake.details.duration)
                        )}
                    </span>
                </div>
                <div className="success-txn-item">
                    <span className="success-item-label">You will earn</span>
                    <span className="success-item-value">
                        {stake &&
                            `${addCommas(
                                calculateEstimatedRewards(
                                    Number(stake.amount),
                                    stake.details.duration
                                )
                            )} XPNET`}
                    </span>
                </div>
                <div className="success-txn-item image-item">
                    <span className="success-item-label">Your reward</span>
                    <span className="success-item-value">
                        {activeSTakeNFT ? (
                            <img src={activeSTakeNFT?.Uri.image} alt="" />
                        ) : (
                            <div className="loader">
                                <ThreeCircles color="#288bfe" />
                            </div>
                        )}
                    </span>
                </div>
                {/* )} */}
            </div>
            <div onClick={handleClick} className="stake-notif-btn">
                Go to claiming portal
            </div>
        </div>
    );
};
