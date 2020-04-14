import React from 'react';
import './icon-link.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function IconLink(props) {
    return (
        <a className="link" href={props.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={props.icon} color={props.color} size={props.size}/>
        </a>
    );
}
