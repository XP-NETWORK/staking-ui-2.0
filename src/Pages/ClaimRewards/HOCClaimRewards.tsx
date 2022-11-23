import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

export const HOCClaimRewards = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const { blockchain } = useSelector(
            (state: ReduxState) => state.homePage
        );
        return <OriginalComponent chain={blockchain.chain} />;
    };
};
