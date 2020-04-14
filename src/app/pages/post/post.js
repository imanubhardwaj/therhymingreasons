import React from 'react';
import './post.css';
import Post from "../../components/post/post";
import Firebase from "../../services/firebase";
import Spinner from "../../components/spinner/spinner";
import moment from "moment";
import {withRouter} from "react-router-dom";
import Comment from "../../components/comment/comment";

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        ({slug: this.slug} = this.props.match.params);

        this.state = {post: null, hideSpinner: false, invalidComment: true};

        this.form = {name: React.createRef(), comment: React.createRef()};

        this.validateCommentForm = this.validateCommentForm.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        this.subscription = Firebase.getPost(this.slug);
        this.subscription.then(post => {
            if (!post) {
                this.props.history.push('/404');
                return;
            }
            this.setState({post, hideSpinner: true});
            this.addInputHandlers();
            Firebase.updatePostViewCount(this.slug, (post.views || 0) + 1);
        });
    }

    addInputHandlers() {
        const refs = Object.keys(this.form);
        refs.forEach(ref => {
            this.form[ref].current.addEventListener('input', event => {
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
            comment,
            date: moment().unix(),
            isVerified: false
        };
        this.subscription = Firebase.postComment(this.slug, data).then(this.clearInputs.bind(this));
    }

    clearInputs() {
        const refs = Object.keys(this.form);
        refs.forEach(ref => this.form[ref].current.value = "");
        this.validateCommentForm();
    }

    render() {
        return (
            <div className="post-container">
                {!this.state.hideSpinner && <Spinner/>}
                {this.state.post && this.getPostPageContent(this.state.post)}
            </div>
        );
    }

    getPostPageContent(post) {
        return (
            <div>
                <Post post={post} minimize={false}/>
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
                {post.comments && this.getPostComments(post.comments)}
            </div>
        );
    }

    getPostComments(comments) {
        return (
            <div className="comments-list">
                <p className="heading">Comments</p>
                {comments.map(comment => <Comment key={comment.date} comment={comment}/>)}
            </div>
        );
    }

    componentWillUnmount() {
        this.subscription.cancel();
    }
}

export default withRouter(PostPage);
