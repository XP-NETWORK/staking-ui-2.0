import React, { FC, useEffect, useState } from "react";
import "./progressbar.scss";
import emojy from "../../assets/images/desk/emojy.svg";

interface Props {
  totalStaking:number,
  stakingLimit:number
}

export const ProgressBar: FC<Props> = ({totalStaking,stakingLimit}) => {
  const [precent, setprecent] = useState(100);

  useEffect(() => {
    let per = totalStaking/stakingLimit * 100;
    setprecent(per)
  }, []);

  return (
    <>
    <div className="progress">
      <div className="progressContainerHome">
        <div className="progressLoader" style={{width: `${precent}%`}}></div>
      </div>
      <div
        className="progressDetails"
        style={{ visibility: `${precent >= 100 ? "visible" : "hidden"}` }}
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
