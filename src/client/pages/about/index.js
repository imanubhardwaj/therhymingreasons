import React from 'react';
import Spinner from "../../components/spinner/spinner";
import Firebase from "../../services/firebase";
import './about.css';
import Head from "next/head";

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {about: null, hideSpinner: false};
    }

    componentDidMount() {
        this.subscription = Firebase.getAboutPageContent();
        this.subscription.then(about => this.setState({about, hideSpinner: true}))
    }

    render() {
        return (
            <div className="about-container">
                <Head>
                    <title>About | The Rhyming Reasons</title>
                    <meta name="title" content="About | The Rhyming Reasons"/>
                    <meta name="description" content="I have been extremely sluggish in expressing my thoughts, though things have started to change lately. But back then, things were terrible. I was afraid of being..."/>
                    <link rel="canonical" href="http://blog.manubhardwaj.in/about"/>
                </Head>
                {!this.state.hideSpinner && <Spinner/>}
                {this.state.about && this.getAboutPageContent()}
            </div>
        );
    }

    getAboutPageContent() {
        const {author, blog} = this.state.about;
        return (
            <div className="content">
                <h2 className="about-heading">About the Author</h2>
                <p dangerouslySetInnerHTML={{__html: author}}></p>
                <h2>Why I started The Rhyming Reasons?</h2>
                <p dangerouslySetInnerHTML={{__html: blog}}></p>
                <h2 className="contact-heading">Want to Connect? Feel free to drop in and Say Hi !</h2>
                <p>Phone: +91 97182-82486</p>
                <p>Email: <a className="mail-link" href="mailto:immanubhardwaj@gmail.com">immanubhardwaj@gmail.com</a>
                </p>
            </div>
        );
    }

    componentWillUnmount() {
        this.subscription.cancel();
    }
}
