
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

export const allFilterButtonObjects = [
    {id: 1, filterName: 'Tue', active: false, },
    {id: 0, filterName: 'Mon', active: false, },
    {id: 3, filterName: 'Thu', active: false, },
    {id: 2, filterName: 'Wed', active: false, },
    {id: 4, filterName: 'Fri', active: false, },
    {id: 5, filterName: 'Sat', active: false, },
    {id: 6, filterName: 'Sun', active: false, },
    {id: 7, filterName: 'Bringers', active: false, },
    {id: 8, filterName: 'Non-bringers', active: false, },
    {id: 9, filterName: 'All', active: false, }
];