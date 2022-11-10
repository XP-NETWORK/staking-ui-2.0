import React, { FC } from "react";

const HigherALGO = (OriginalComponent: React.FC<any>) => {
    return () => {
        return <OriginalComponent />;
    };
};
export { HigherALGO };
