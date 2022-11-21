import React, { FC } from "react";
import { useDispatch } from "react-redux";

export const HigherEVM = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const getStyles = () => {};

        const handleWalletConnection = () => {};

        return (
            <OriginalComponent
                connect={handleWalletConnection}
                styles={getStyles}
            />
        );
    };
};
