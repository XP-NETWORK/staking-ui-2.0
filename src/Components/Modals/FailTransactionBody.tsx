import { FC } from "react";
import { useNavigate } from "react-router";
import fail from "./../../assets/images/404.png";

interface Props {}

export const FailTransactionBody: FC<Props> = () => {
    const navigate = useNavigate();

    return (
        <div className="fail-txn-body">
            <img src={fail} alt="" />
            <h4>Staking Incomplete</h4>
            <div>
                An error has occurred.
                <br /> Please try again.
            </div>
            <div
                onClick={() =>
                    navigate(`${location.pathname}${location.search}`)
                }
                className="stake-notif-btn"
            >
                Back to Staking
            </div>
            <a
                href="https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot"
                target="_blank"
                rel="noreferrer"
            >
                Contact Help Center {"->"}
            </a>
        </div>
    );
};
