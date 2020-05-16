import React from "react";
import Head from "next/head";
import HelperUtils from "../../utils/helper";
import StringUtils from "../../utils/string";
import "./about.css";

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        HelperUtils.setViewableContentSizeCssProperty();
    }

    render() {
        const [author, blog] = [StringUtils.getAboutAuthor(), StringUtils.getAboutBlog()];
        return (
            <div className="about-container">
                <Head>
                    <title>About | The Rhyming Reasons</title>
                    <meta name="title" content="About | The Rhyming Reasons"/>
                    <meta name="description" content="I have been extremely sluggish in expressing my thoughts, though things have started to change lately. But back then, things were terrible. I was afraid of being..."/>
                    <meta name="keywords" content="rhymes,reason,poems,poetry,manu" />
                    <link rel="canonical" href="https://therhymingreasons.com/about"/>
                </Head>
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
            </div>
        );
    }
}
