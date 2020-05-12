import React from "react";
import Link from "next/link";
import "./invalid.css";

export default function InvalidPage() {
    return (
        <div className="invalid-page-container">
            <img src="/images/invalid-page.svg" alt="Person standing on road"/>
            <p className="label">Looks like you're lost.</p>
            <Link href="/"><a className="home-link">Return to Home</a></Link>
        </div>
    );
}
