import React from 'react';

export default function ReuseableInput({ title, currentValue, placeholderText, handleChange, icon }) {
    return (
        <div className="div__flex-col div__flex-center">
            <div className="div__flex-row div__flex-center">
                { icon && <img src={icon} width={20} height={20} /> }
                <h4>{title}</h4>
            </div>
            <input
                name={title}
                value={currentValue}
                placeholder={placeholderText}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}
