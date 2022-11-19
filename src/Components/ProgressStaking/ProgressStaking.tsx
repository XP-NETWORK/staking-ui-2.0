import React, { FC, useState } from "react";
import "./progressStaking.scss";
import emojy from "../../assets/images/desk/emojy.svg";

interface Props {}

export const ProgressStaking: FC<Props> = ({}) => {
  const [precent, setprecent] = useState(100);
  return (
    <>
      <div className="progress">
        <div className="progressContainer">
          <div
            className="progressDetails"
            style={{ visibility: `${precent === 100 ? "visible" : "hidden"}` }}
          ></div>
        </div>
      </div>
    </>
  );
};
