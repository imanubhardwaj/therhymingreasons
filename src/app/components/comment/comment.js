import React from 'react';
import './comment.css';
import moment from "moment";

export default function Comment({comment}) {
    const getCommentDate = date => {
        const currentTimestamp = moment(moment().format('YYYY MM DD') + ' 00:00:00').unix()
        return date < currentTimestamp ? moment.unix(date).format('MMM DD, YYYY') : moment.unix(date).fromNow()
    };

    return (
        <div className="comment">
            <p className="heading"><b>{comment.name || 'Anonymous'}</b></p>
            <p dangerouslySetInnerHTML={{__html: comment.comment}}></p>
            <span>{getCommentDate(comment.date)}</span>
        </div>
    );
}
