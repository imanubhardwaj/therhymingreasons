import React from 'react';
import './post.css';
import {Link} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import StringUtils from "../../utils/string";
import IconText from "../icon-text/icon-text";
import HelperUtils from "../../utils/helper";
import moment from 'moment';
import IconLink from "../icon-link/icon-link";

export default function Post(props) {
    const post = props.post || {};

    // Post Content
    let {content} = post;
    const {minimize} = props;
    if (minimize) {
        const secondIndex = StringUtils.getPosition(content, '<br><br>', 2);
        content = `${content.substring(0, secondIndex)}`;
    }

    // Share Urls
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/posts/${post.slug}&t=${encodeURI(post.title)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${window.location.origin}/posts/${post.slug}&text=${encodeURI(post.title)}`;
    const mailUrl = `mailto:?subject=${encodeURI(post.title + ' by The Rhyming Reasons')}&body=${encodeURI('Read ' + post.title + ' at ' + window.location.origin + '/posts/' + post.slug)}`;
    const whatsappText = `%2AThe%20Rhyming%20Reasons%2A%0A%0A${encodeURI(post.title)}%0A%0A${window.location.origin}/posts/${post.slug}`;
    let whatsappUrl = `whatsapp://send?text=${whatsappText}`;
    if (HelperUtils.isDesktop()) {
        whatsappUrl = `https://wa.me?text=${whatsappText}`;
    }

    return (
        <div className="post">
            <h1 className="title">{post.title}️</h1>
            <div className="container">
                <p dangerouslySetInnerHTML={{__html: content}} className="content"></p>
                {minimize && <HashLink to={`/${post.slug}`} className="post-link">Read Full Poem</HashLink>}
            </div>
            <IconText icon="eye" text={`${post.views} Views`}/>
            <div className="post-meta">
                <Link to="/about"><IconText icon="user" text={post.author}/></Link>
                <IconText icon="clock" text={moment(post.date).format('MMMM DD, YYYY')}/>
                <IconText icon="tags" text={post.tags}/>
                <HashLink to={`/${post.slug}#comment-box`} className="post-link"><IconText icon="comment" text="Comment"/></HashLink>
            </div>
            <div className="post-share">
                <IconText icon="share" text="Share"/>
                <IconLink icon={['fab', 'facebook']} color="#3b5998" size="lg" link={facebookUrl}/>
                <IconLink icon={['fab', 'twitter']} color="#1DA1F2" size="lg" link={twitterUrl}/>
                <IconLink icon={['fab', 'whatsapp']} color="#25D366" size="lg" link={whatsappUrl}/>
                <IconLink icon="envelope" color="#333333" size="lg" link={mailUrl}/>
            </div>
        </div>
    );
}
