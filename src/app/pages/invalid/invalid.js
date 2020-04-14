import React from "react";
import './invalid.css';
import svgPath from "../../../assets/images/404.svg";
import {Link} from "react-router-dom";

export default function InvalidPage() {
    return (
        <div className="invalid-page-container">
            <img src={svgPath} alt="Person standing on road"/>
            <p className="label">Looks like you're lost.</p>
            <Link className="home-link" to="/">Return to Home</Link>
        </div>
    );
}
