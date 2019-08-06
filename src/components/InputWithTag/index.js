import React from 'react';
import './styles.css';

const InputWithTag = ({ tagline, onChange, value,
    placeholder, name, disabled, orange }) => (
    <div className={`div__input-w-tag`}>
        <h4 className={ orange ? "p__input-w-tag orange bold-thick" : "p__input-w-tag"}>{tagline}</h4>
        <input
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            name={name}
            type="text"
            disabled={disabled}
            className={`input__input-w-tag`}
        />
    </div>
)

export default InputWithTag;