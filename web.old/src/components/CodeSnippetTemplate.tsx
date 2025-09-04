import React from 'react';

interface CodeSnippetTemplateProps {
    code: string;
    language: string;
}

const CodeSnippetTemplate: React.FC<CodeSnippetTemplateProps> = ({ code, language }) => {
    return (
        <div className="code-snippet">
            <h3>{language} Snippet</h3>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeSnippetTemplate;