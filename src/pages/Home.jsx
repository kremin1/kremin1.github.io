import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to My Portfolio</h1>
            <p>This is the landing page of my portfolio website.</p>
            <section>
                <h2>About Me</h2>
                <p>Here you can find information about my skills and experiences.</p>
            </section>
            <section>
                <h2>Projects</h2>
                <p>Check out some of my recent projects.</p>
            </section>
            <section>
                <h2>Contact</h2>
                <p>Feel free to reach out to me!</p>
            </section>
        </div>
    );
};

export default Home;