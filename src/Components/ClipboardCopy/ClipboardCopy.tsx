import React, { useState } from "react";
import copy from "../../assets/images/copy.svg";
import { IFetchedStake, INFT } from "../../assets/ts/Consts";
import { Copy } from "../Buttons/Copy";

interface Props {
    item: any;
    index: number;
}

export default function ClipboardCopy({ item, index }: Props) {
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
        <div className="clipboard__wrapper">
            <div className="clipboard-label">Asset Id: </div>

            <div className="copyContainer">
                <label>{item?.image || item?.assetId}</label>
                <Copy address={item?.image || item?.assetId} />
            </div>
        </div>
    );
}
