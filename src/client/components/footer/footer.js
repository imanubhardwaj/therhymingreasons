import React from "react";
import IconLink from "../icon-link/icon-link";
import "./footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="label"><a href={`${process.env.BASE_URL}`}>The Rhyming Reasons</a> &#169; 2020</div>
            <div className="social-links">
                <IconLink icon="instagram" color="#C13584" size="2x"
                          link="https://www.instagram.com/the_rhyming_reasons/"/>
                <IconLink icon="facebook" color="#3b5998" size="2x"
                          link="https://www.facebook.com/therhymingreasons/"/>
                <IconLink icon="pinterest" color="#1DA1F2" size="2x"
                          link="https://in.pinterest.com/therhymingreasons/"/>
                <IconLink icon="reddit" color="#1DA1F2" size="2x"
                          link="https://www.reddit.com/user/therhymingreasons/"/>
                <IconLink icon="tumblr" color="#1DA1F2" size="2x"
                          link="http://tumblr.therhymingreasons.com/"/>
            </div>
        </div>
    );
}
