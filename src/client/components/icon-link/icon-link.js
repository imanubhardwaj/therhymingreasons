import React from 'react';
import './icon-link.css';

export default function IconLink(props) {
    return (
        <a className="link icon-link" href={props.link} target="_blank" rel="noopener noreferrer">
            <svg className="icon">
                <use href={'#'+props.icon} />
            </svg>
        </a>
    );
}
