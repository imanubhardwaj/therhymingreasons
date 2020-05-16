import React from "react";
import {withRouter} from "next/router";
import Head from "next/head";
import Post from "../../../components/post/post";
import Comment from "../../../components/comment/comment";
import ApiService from "../../../services/api";
import HelperUtils from "../../../utils/helper";
import "./post-page.css";

class PostPage extends React.Component {
    static async getInitialProps({query, req}) {
        const {slug} = query;
        const post = await ApiService.getPost(slug);
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
        return {post, slug, userAgent};
    }

    constructor(props) {
        super(props);

        ({post: this.post, router: this.router, userAgent: this.userAgent} = props);

        this.state = {invalidComment: true};

        this.form = {name: React.createRef(), comment: React.createRef()};

        this.validateCommentForm = this.validateCommentForm.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        if (!this.post) {
            this.router.replace("/404");
            return;
        }
        HelperUtils.setViewableContentSizeCssProperty();
        this.addInputHandlers();
    }

    addInputHandlers() {
        const refs = Object.keys(this.form);
        refs.forEach(ref => {
            this.form[ref].current.addEventListener("input", event => {
                this.validateCommentForm();
            });
        });
    }

    validateCommentForm() {
        const [name, comment] = [this.form.name.current.value, this.form.comment.current.value];
        this.setState({invalidComment: (!name || !comment)});
    }

    postComment() {
        const [name, comment] = [this.form.name.current.value, this.form.comment.current.value];
        const data = {
            name,
            text: comment,
        };
        this.subscription = ApiService.postComment(this.post._id, data).then(this.clearInputs.bind(this));
    }

    clearInputs() {
        const refs = Object.keys(this.form);
        refs.forEach(ref => this.form[ref].current.value = "");
        this.validateCommentForm();
    }

    render() {
        const post = this.post;
        return (
            <div className="post-container">
                <Head>
                    {/*HTML Meta Tags*/}
                    <title>{post.title}</title>
                    <meta name="description" content={HelperUtils.getMetaDescription(post.content)}/>
                    <meta name="keywords" content="rhymes,reason,poems,poetry,manu" />

                    {/*Google / Search Engine Tags*/}
                    <meta itemprop="name" content={post.title}/>
                    <meta itemprop="description" content={HelperUtils.getMetaDescription(post.content)}/>
                    {post.img && <meta itemprop="image" name="og:image" content={post.img}/>}

                    {/*Facebook Meta Tags*/}
                    <meta property="og:url" content={`https://therhymingreasons.com/posts/${post.slug}`}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={post.title}/>
                    <meta property="og:description" content={HelperUtils.getMetaDescription(post.content)}/>
                    {post.img && <meta name="og:image" content={post.img}/>}

                    {/*Twitter Meta Tags*/}
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content={post.title}/>
                    <meta name="twitter:description" content={HelperUtils.getMetaDescription(post.content)}/>
                    {post.img && <meta name="twitter:image" content={post.img}/>}

                    {/*Canonical Tag*/}
                    <link rel="canonical" href={`https://therhymingreasons.com/posts/${post.slug}`}/>
                </Head>
                {this.getPostPageContent(post)}
            </div>
        );
    }

    getPostPageContent(post) {
        return (
            <div>
                <Post post={post} minimize={false} userAgent={this.userAgent}/>
                <div id="comment-box">
                    <p className="heading">Leave a comment</p>
                    <div className="input-container name">
                        <input ref={this.form.name} placeholder="Type your name here" required/>
                    </div>
                    <div className="input-container comment">
                        <textarea ref={this.form.comment} placeholder="Type your comment here" required/>
                    </div>
                    <button disabled={this.state.invalidComment} className="post-btn" onClick={this.postComment}>
                        Post Comment
                    </button>
                </div>
                {!!post.comments.length && this.getPostComments(post.comments)}
            </div>
        );
    }

    getPostComments(comments) {
        return (
            <div className="comments-list">
                <p className="heading">Comments</p>
                {comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
            </div>
        );
    }
}

export default withRouter(PostPage);
