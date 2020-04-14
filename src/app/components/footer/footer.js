import React from 'react';
import './footer.css';
import IconLink from "../icon-link/icon-link";

export default function Footer() {
    return (
        <div className="footer">
            <span className="label">The Rhyming Reasons &#169; 2020</span>
            <div className="social-links">
                <IconLink icon={['fab', 'facebook']} color="#3b5998" size="2x"
                          link="https://www.facebook.com/therhymingreasons/"/>
                <IconLink icon={['fab', 'twitter']} color="#1DA1F2" size="2x"
                          link="https://twitter.com/rhymingreasons/"/>
                <IconLink icon={['fab', 'instagram']} color="#C13584" size="2x"
                          link="https://www.instagram.com/the_rhyming_reasons/"/>
            </div>
        </div>
    );
}
