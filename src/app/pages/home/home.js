import React from 'react';
import './home.css';
import Post from "../../components/post/post";
import Firebase from "../../services/firebase";
import Spinner from "../../components/spinner/spinner";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], hideSpinner: false};
    }

    componentDidMount() {
        this.subscription = Firebase.getPosts();
        this.subscription.then(posts => this.setState({posts, hideSpinner: true}));
    }

    render() {
        return (
            <div className="home-container">
                <div className="posts-list">
                    {!this.state.hideSpinner && <Spinner/>}
                    {this.state.posts.map(post => <Post post={post} minimize={true} key={post.date}/>)}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.subscription.cancel();
    }
}
