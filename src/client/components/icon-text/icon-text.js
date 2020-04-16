import React from 'react';
import './icon-text.css';

export default function IconText(props) {
    return (
        <div className="row icon-text">
            <svg className="icon">
                <use href={'#'+props.icon} />
            </svg>
            <span>{props.text}</span>
        </div>
    );
}
