import ReactGA from 'react-ga';

export const updateMetaTagsForFacebook = (headline, url, descr) => {
    
    // page title
    document.querySelector('title').innerHTML = `TPR | ${headline}`;

    // update meta title
    const metaTitle = document.createElement('meta');
    metaTitle.setAttribute('property', 'og:title');
    metaTitle.setAttribute('content', headline);

    // update meta url
    const metaURL = document.createElement('meta');
    metaURL.setAttribute('property', 'og:url');
    metaURL.setAttribute('content', url);

    // update meta description
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('property', 'og:description');
    metaDescription.setAttribute('content', descr);

    // append all of them to the head.
    // document.querySelector('head').appendChild(pageTitle);
    document.querySelector('head').appendChild(metaTitle);
    document.querySelector('head').appendChild(metaURL);
    document.querySelector('head').appendChild(metaDescription);
}


export const analyticsPage = str => {
    if (process.env.NODE_ENV === 'production') {
        console.log('in prod so firing analytics');
        return ReactGA.pageview(`/${str}`);
      } else {
        console.log('no analytics PAGE because not prod : ', str);
      }
}

export const analyticsEvent = str => {
    if (process.env.NODE_ENV === 'production') {
        console.log('in prod so firing analytics');
        return ReactGA.event({
            category: 'User',
            action: str,
        });
      } else {
        console.log('no analytics EVENT because not prod : ', str);
      }
}

export const whatDayIsIt = () => {
    const date = new Date();
    const day = date.getDay();

    switch(day) {
        case 0:
            return 'Sun';
            break;
        case 1:
            return 'Mon';
            break;
        case 2:
            return 'Tue';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thu';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
    }
}


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