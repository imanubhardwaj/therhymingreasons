import React from 'react';
import Head from "next/head";
import Spinner from "../../components/spinner/spinner";
import Post from "../../components/post/post";
import Firebase from "../../services/firebase";
import HelperUtils from "../../utils/helper";
import './home.css';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], hideSpinner: false};
    }

    componentDidMount() {
        HelperUtils.setViewableContentSizeCssProperty();
        this.subscription = Firebase.getPosts();
        this.subscription.then(posts => this.setState({posts, hideSpinner: true}));
    }

    render() {
        return (
            <div className="home-container">
                <Head>
                    {/*HTML Meta Tags*/}
                    <title>The Rhyming Reasons | A Poetry Blog</title>
                    <meta name="description" content="Emotions and Words."/>

                    {/*Google / Search Engine Tags*/}
                    <meta itemprop="name" content="The Rhyming Reasons | A Poetry Blog"/>
                    <meta itemprop="description" content="Emotions and Words."/>
                    <meta itemprop="image" content="https://blog.manubhardwaj.in/images/logo.png"/>

                    {/*Facebook Meta Tags*/}
                    <meta property="og:url" content="https://blog.manubhardwaj.in"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content="The Rhyming Reasons | A Poetry Blog"/>
                    <meta property="og:description" content="Emotions and Words."/>
                    <meta property="og:image" content="https://blog.manubhardwaj.in/images/logo.png"/>

                    {/*Twitter Meta Tags*/}
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content="The Rhyming Reasons | A Poetry Blog"/>
                    <meta name="twitter:description" content="Emotions and Words."/>
                    <meta name="twitter:image" content="https://blog.manubhardwaj.in/images/logo.png"/>

                    {/*Canonical Tag*/}
                    <link rel="canonical" href="https://blog.manubhardwaj.in"/>
                </Head>
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
