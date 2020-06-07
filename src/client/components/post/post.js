import React from "react";
import {useRouter} from "next/router";
import moment from "moment";
import IconText from "../icon-text/icon-text";
import IconLink from "../icon-link/icon-link";
import StringUtils from "../../utils/string";
import HelperUtils from "../../utils/helper";
import "./post.css";

export default function Post(props) {
    const post = props.post || {};

    const router = useRouter();

    // Post Content
    let {content} = post;
    const {minimize} = props;
    if (minimize) {
        const secondIndex = StringUtils.getPosition(content, "\n\n", 2);
        content = `${content.substring(0, secondIndex)}`;
    }

    // Share Urls
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${process.env.BASE_URL}/posts/${post.slug}&t=${encodeURI(post.title)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${process.env.BASE_URL}/posts/${post.slug}&text=${encodeURI(post.title)}`;
    const mailUrl = `mailto:?subject=${encodeURI(post.title + " by The Rhyming Reasons")}&body=${encodeURI("Read " + post.title + " at " + process.env.BASE_URL + "/posts/" + post.slug)}`;
    const whatsappText = `%2AThe%20Rhyming%20Reasons%2A%0A%0A${encodeURI(post.title)}%0A%0A${process.env.BASE_URL}/posts/${post.slug}`;
    let whatsappUrl = `https://wa.me?text=${whatsappText}`;
    if (HelperUtils.isMobile(props.userAgent)) {
        whatsappUrl = `whatsapp://send?text=${whatsappText}`;
    }

    const openPost = () => router.push(`/posts/${post.slug}#comment-box`);

    const postUrl = `${process.env.BASE_URL}/posts/${post.slug}`;

    return (
        <div className="post">
            <a href={postUrl}>
                {props.useH1 ? <h1 className="title">{post.title}️</h1> : <span className="title">{post.title}️</span>}
            </a>
            <div className="container">
                <p className="content">{content}</p>
                {minimize && <a className="post-link link" href={postUrl}>Read Full Poem</a>}
            </div>
            <IconText icon="eye" text={`${HelperUtils.viewCount(post.views, 2)} Views`}/>
            <div className="post-meta">
                <IconText icon="user" text={post.author}/>
                <IconText icon="clock" text={moment(post.publishDate).format("MMMM DD, YYYY")}/>
                <IconText icon="tags" text={post.tags}/>
                <div className="clickable" onClick={openPost}><IconText icon="comment" text="Comment"/></div>
            </div>
            <div className="post-share">
                <IconText icon="share" text="Share"/>
                <IconLink icon="facebook" color="#3b5998" size="lg" link={facebookUrl}/>
                <IconLink icon="twitter" color="#1DA1F2" size="lg" link={twitterUrl}/>
                <IconLink icon="whatsapp" color="#25D366" size="lg" link={whatsappUrl}/>
                <IconLink icon="email" color="#333333" size="lg" link={mailUrl}/>
            </div>
        </div>
    );
}
