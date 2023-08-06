import React, { FC, useState } from "react";
import icon from "../../assets/images/copy-hover.svg";

interface Props {
    address: string;
}

export const Copy: FC<Props> = ({ address }) => {
    const [mouseIn, setMouseIn] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(address);
        } catch (error) {
            console.log(error, "error navigator");
        }
    };

    return (
        <div
            onClick={copy}
            style={{ opacity: mouseIn ? "1" : "0.6", cursor: "pointer" }}
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}
            className="copy__container"
        >
            <img src={icon} alt="" />
        </div>
    );
};
