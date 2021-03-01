import React from 'react';
import './Hero.css'

const Hero = (props) => {
    return (
        <div className="heroGlobalBox">
            <h2 className="heroGlobalHeading">{props.title}</h2>
        </div>
    );
};

export default Hero;