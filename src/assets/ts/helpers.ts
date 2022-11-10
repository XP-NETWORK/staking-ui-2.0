

export const addCommas = (x:Number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
