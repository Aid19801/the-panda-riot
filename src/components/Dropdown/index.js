import React from 'react'

export default function ReUseableDropdown({ title, optionsArray, handleChange, selectedOptions }) {
    return (
        <div className="div__dropdown-container div__flex-col">
            <div className="div__flex-row">
                <h4>{title}</h4>
                
            </div>

            <div className="div__flex-row">
                { selectedOptions.map((each, i) => { return <h4 key={i}>{each.name}</h4> })}
            </div>
        </div>
    )
}
