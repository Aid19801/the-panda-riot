
export const trimString = str => {
    if (str.length > 540) {
        return str.slice(0, 41040) + '...';
    }
    return str;
}