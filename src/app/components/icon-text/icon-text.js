import React from 'react';
import './icon-text.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function IconText(props) {
    return (
        <div className="row icon-text">
            <FontAwesomeIcon className="icon" icon={props.icon} />
            <span>{props.text}</span>
        </div>
    );
}
