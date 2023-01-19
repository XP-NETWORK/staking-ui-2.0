import React, { FC, useEffect, useRef, useState } from "react";
import icon from "../../assets/images/close-icon.svg";

interface Props {
    func: any;
}

export const Close: FC<Props> = ({ func }) => {
    const [mouseIn, setMouseIn] = useState(false);
    return (
        <div
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}
            onClick={() => func(false)}
            style={{ opacity: mouseIn ? "1" : "0.6", cursor: "pointer" }}
        >
            <img src={icon} alt="" />
        </div>
    );
};
