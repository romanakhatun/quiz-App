import React from 'react';
import Hero from './Hero';
import { WebsiteName } from '../../App'

const Home = () => {
    document.title = "Grow Your Knowledge | " + WebsiteName;
    return (
        <div>
            <Hero title="Grow Your Knowledge"></Hero>
        </div>
    );
};

export default Home;