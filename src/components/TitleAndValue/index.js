import React from 'react';
import './styles.css';


const TitleAndValue = ({title, value}) => {

    return (
        <div className="div__title-and-value-container">
            <h3 className="h3__title-value__title">{title}</h3>
            <h3 className="h3__title-value__value">{value}</h3>
        </div> 
    )
}

export default TitleAndValue;