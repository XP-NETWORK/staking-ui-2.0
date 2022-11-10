import React, { FC, useState } from "react";
import "./progressbar.scss";
import emojy from "../../assets/images/desk/emojy.svg";

interface Props {}

export const ProgressBar: FC<Props> = ({}) => {
  const [precent, setprecent] = useState(100);
  return (
    <>
    <div className="progress"> 
      <div className="progressContainer"></div>
      <div
        className="progressDetails"
        style={{ visibility: `${precent === 100 ? "visible" : "hidden"}` }}
      >
        <label>
          <img src={emojy} />
          Staking limit is reached!
        </label>
        {precent}%
      </div></div>
    </>
  );
};
