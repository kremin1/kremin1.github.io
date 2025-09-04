import React from 'react';

interface ProjectTemplateProps {
    title: string;
    description: string;
    links: {
        demo?: string;
        repository?: string;
    };
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ title, description, links }) => {
    return (
        <div className="project-template">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="project-links">
                {links.demo && <a href={links.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                {links.repository && <a href={links.repository} target="_blank" rel="noopener noreferrer">GitHub Repository</a>}
            </div>
        </div>
    );
};

export default ProjectTemplate;