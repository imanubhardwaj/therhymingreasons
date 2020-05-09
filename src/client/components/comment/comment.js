import React from 'react';
import moment from "moment";
import './comment.css';

export default function Comment({comment}) {
    const getCommentDate = date => {
        const currentTimestamp = moment(moment().format('YYYY MM DD') + ' 00:00:00').unix();
        return date < currentTimestamp ? moment(date).format('MMM DD, YYYY') : moment(date).fromNow()
    };

    return (
        <div className="comment">
            <p className="heading"><b>{comment.name || 'Anonymous'}</b></p>
            <p>{comment.text}</p>
            <span>{getCommentDate(comment.createdAt)}</span>
        </div>
    );
}
