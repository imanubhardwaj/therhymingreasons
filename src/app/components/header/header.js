import React from 'react';
import './header.css';
import {Link, useLocation} from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const useHeadingTag = location.pathname === '/' || location.pathname === '/about';
    const link = <Link to="/">The Rhyming Reasons</Link>;
    const title = useHeadingTag ? <h1 className="title">{link}</h1> : <h2 className="title">{link}</h2>;
    return (
        <div className="header">
            <div className="row">
                {title}
                <div className="row links">
                    <a className="link" href="mailto:immanubhardwaj@gmail.com" target="_blank">Connect</a>
                    <Link to="/about" className="link">About</Link>
                </div>
            </div>
            <p className="subtitle">Emotions And Words</p>
        </div>
    );
}
