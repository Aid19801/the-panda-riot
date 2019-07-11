import React from 'react';
import './styles.css';


const TitleAndValue = ({title, value}) => {

    return (
        <div className="div__title-and-value-container">
            <h3 className="h3__title-value__title">{title}</h3>
            <h4 className="h4__title-value__value">{value}</h4>
        </div> 
    )
}

export default TitleAndValue;