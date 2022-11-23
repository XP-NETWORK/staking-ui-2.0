import React, { useState } from "react";
import copy from "../../assets/images/copy.svg";

interface Props {
    stake: any;
}

export default function ClipboardCopy({ stake }: Props) {
    const [isCopied, setIsCopied] = useState(false);

    const copyTextToClipboard = async (copyText: string) => {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(copyText);
        } else {
            return document.execCommand("copy", true, copyText);
        }
    };

    const handleCopyClick = (copyText: string) => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="copyContainer">
            <label>{stake?.image}</label>
            <img
                src={copy}
                alt="copy"
                onClick={() => handleCopyClick(stake?.image)}
                className="copyBtn"
            />
        </div>
    );
}
