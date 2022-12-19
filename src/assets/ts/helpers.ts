import axios from "axios";
import { useEffect } from "react";

export const addCommas = (x: Number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateEstimatedRewards = (amount: number, duration: number) => {
    let rewards;
    switch (duration) {
        case 3:
            rewards = 1.25 * amount - amount;
            break;
        case 6:
            rewards = 1.5 * amount - amount;
            break;
        case 9:
            rewards = 1.75 * amount - amount;
            break;
        case 12:
            rewards = 2 * amount - amount;
            break;
        default:
            rewards = 0;
            break;
    }
    return rewards;
};

export const calculateDurationTime = (duration: number) => {
    let locktime2weeks = 1209600;
    let durInSec;
    //   if (duration !== 12) {
    //     durInSec = 60 * 60 * 24 * (duration * 30);
    //   } else {
    durInSec = locktime2weeks * 2 * duration;
    //   }
    return durInSec;
};

export const calculateEndDate = (duration: number) => {
    let endDate;
    var d = new Date();
    d.setMonth(d.getMonth() + duration);
    endDate =
        d.getFullYear() +
        "-" +
        (d.getDate() < 10 ? "0" : "") +
        d.getDate() +
        "-" +
        (d.getMonth() < 10 ? "0" : "") +
        (d.getMonth() + 1);
    return endDate;
};

export const calculatAPY = (duration: number) => {
    switch (duration) {
        case 3:
            return 45;
        case 6:
            return 75;
        case 9:
            return 100;
        case 12:
            return 125;
        default:
            return 0;
    }
};

export const getCurrentPrice = async () => {
    const response = await fetch("https://api.xp.network/current-price");
    let currentPrice = await response.json();
    return currentPrice;
};

getCurrentPrice();

export const cutTwoDigits = async (num: number) => {
    return num.toFixed(2);
};

export function useOnClickOutside(ref: any, handler: any) {
    useEffect(
        () => {
            const listener = (event: any) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export const fetchXPUpdate = () => {
    return axios
        .get("https://xpvitaldata.herokuapp.com/last-commit")
        .then((response) => {
            return transformToDate(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

const transformToDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
    const year = dateObj.getFullYear();
    const tm = month + ", " + year;
    return tm;
};
