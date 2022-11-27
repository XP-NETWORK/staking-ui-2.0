import React, { useState } from "react";
import copy from "../../assets/images/copy.svg";

interface Props {
    stake: any;
    index: number;
}

export default function ClipboardCopy({ stake, index }: Props) {
    console.log(
        "🚀 ~ file: ClipboardCopy.tsx.tsx ~ line 10 ~ ClipboardCopy ~ stake",
        stake
    );
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
            <label>{stake?.image || stake?.displayImage}</label>
            <img
                src={copy}
                alt="copy"
                onClick={() =>
                    handleCopyClick(stake?.image || stake?.displayImage)
                }
                className="copyBtn"
            />
        </div>
    );
}
