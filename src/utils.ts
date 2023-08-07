const getSubstringValue = (length: number) => {
    if (window.innerWidth <= 320) return 3;
    else if (window.innerWidth <= 375) return length;
    else return false;
};

export const StringShortener = (str: string, length: number) =>
    str
        ? `${str.substring(
              0,
              getSubstringValue(length) || 5
          )}...${str.substring(str.length - length)}`
        : "";
