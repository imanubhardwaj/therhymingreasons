import React from 'react';
import IconLink from "../icon-link/icon-link";
import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="label"><a href="https://blog.manubhardwaj.in/">The Rhyming Reasons</a> &#169; 2020</div>
            <div className="social-links">
                <IconLink icon="facebook" color="#3b5998" size="2x"
                          link="https://www.facebook.com/therhymingreasons/"/>
                <IconLink icon="twitter" color="#1DA1F2" size="2x"
                          link="https://twitter.com/rhymingreasons/"/>
                <IconLink icon="instagram" color="#C13584" size="2x"
                          link="https://www.instagram.com/the_rhyming_reasons/"/>
            </div>
        </div>
    );
}
