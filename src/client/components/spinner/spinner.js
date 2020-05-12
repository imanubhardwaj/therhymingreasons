import React from "react";
import "./spinner.css";

export default function Spinner() {
    return (
        <div className="spinner">
            <div className="spinner-grow" role="status"></div>
            <span>Loading</span>
        </div>
    );
}
