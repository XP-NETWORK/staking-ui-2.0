import React, { FC, useState } from "react";
import "./progressStaking.scss";
import emojy from "../../assets/images/desk/emojy.svg";

interface Props {
    progress: number;
}

export const ProgressStaking: FC<Props> = ({ progress }) => {
    return (
        <>
            <div className="progress">
                <div className="progressContainer">
                    <div
                        className="active-progress"
                        style={{
                            width: "100%",
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};
