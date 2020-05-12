import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import "./header.css";

export default function Header() {
    const router = useRouter();
    const path = router.pathname;
    const useHeadingTag = path === "/" || path === "/about";
    const link = <Link href="/"><a className="link">The Rhyming Reasons</a></Link>;
    const title = useHeadingTag ? <h1 className="title">{link}</h1> : <h2 className="title">{link}</h2>;
    return (
        <div className="header">
            <div className="row">
                {title}
                <div className="row links">
                    <a className="link" href="mailto:immanubhardwaj@gmail.com" target="_blank">Connect</a>
                    <Link href="/about"><a className="link">About</a></Link>
                </div>
            </div>
            <p className="subtitle">Emotions And Words</p>
        </div>
    );
}
