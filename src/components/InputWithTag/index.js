import React from 'react';
import './styles.css';

const InputWithTag = (props) => (
    <div className={`div__input-w-tag`}>
        <p className={`p__input-w-tag`}>{props.tagline}</p>
        <input
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            name={props.name}
            type="text"
            disabled={props.disabled}
            className={`input__input-w-tag`}
        />
    </div>
)

export default InputWithTag;