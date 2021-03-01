import React from 'react';
import Hero from './Hero';
import { WebsiteName } from '../../App'

const Home = () => {
    document.title = "Grow Your Knowledge | " + WebsiteName;
    return (
            <Hero title="Grow Your Knowledge"></Hero>
    );
};

export default Home;