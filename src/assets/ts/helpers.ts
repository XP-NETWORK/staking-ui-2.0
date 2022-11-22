// import {
//     appAdress12Months,
//     appAdress3Months,
//     appAdress6Months,
//     appAdress9Months,
//     duration3Months,
//     duration9Months,
//     duration6Months,
//     duration12Months,
// } from "./Consts";

export const addCommas = (x: Number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateEstimatedRewards = (amount: number, duration: number) => {
    let rewards;
    switch (duration) {
        case 3:
            rewards = 1.45 * amount;
            break;
        case 6:
            rewards = 1.75 * amount;
            break;
        case 9:
            rewards = 2 * amount;
            break;
        case 12:
            rewards = 2.25 * amount;
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
    // const currentPrice = (await axios.get("https://api.xp.network/current-price")).data;
    const response = await fetch("https://api.xp.network/current-price");
    let currentPrice = await response.json();
    return currentPrice;
};

getCurrentPrice();

export const cutTwoDigits = async (num: number) => {
    return num.toFixed(2);
};
