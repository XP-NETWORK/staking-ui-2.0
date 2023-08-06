import React, { FC } from "react";
import "./progressStaking.scss";

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
                            width: `${progress}%`,
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};
