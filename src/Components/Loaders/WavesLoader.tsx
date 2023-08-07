import React, { FC } from "react";
import "./wavesLoader.scss";

export const WavesLoader: FC<any> = ({ wrap }: { wrap?: boolean }) => {
    const content = (
        <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    );

    return wrap ? (
        <div
            className="connect-modal algoSelector"
            style={{
                position: "fixed",
                left: "0px",
                top: window.innerWidth <= 600 ? "-20px" : "0px",

                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: "59",
            }}
        >
            {content}
        </div>
    ) : (
        content
    );
};
