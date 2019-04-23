
export const trimString = str => {
    if (str.length > 540) {
        return str.slice(0, 41040) + '...';
    }
    return str;
}

export const trimStringSpecifically = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    }
    return str;
}

export const tooSoon = () => {
    const lastTimeVoted = localStorage.getItem('timevoted');
    const timeNow = Date.now();
    const differenceBetween = timeNow - parseInt(lastTimeVoted);
    if (differenceBetween <= 9999) {
        return true;
    } else {
        return false;
    }
}