import React from 'react';
import CodeSnippetTemplate from './components/CodeSnippetTemplate';
import ProjectTemplate from './components/ProjectTemplate';

const App = () => {
  return (
    <div>
      <h1>My Portfolio</h1>
      <section>
        <h2>Code Snippets</h2>
        <CodeSnippetTemplate 
          code={`console.log('Hello, World!');`} 
          language="JavaScript" 
        />
        <CodeSnippetTemplate 
          code={`print('Hello, World!')`} 
          language="Python" 
        />
        <CodeSnippetTemplate 
          code={`console.log('Hello, TypeScript!');`} 
          language="TypeScript" 
        />
      </section>
      <section>
        <h2>Projects</h2>
        <ProjectTemplate 
          title="Project 1" 
          description="This is a description of Project 1." 
          links={{ demo: 'https://example.com/demo1', repo: 'https://github.com/example/repo1' }} 
        />
        <ProjectTemplate 
          title="Project 2" 
          description="This is a description of Project 2." 
          links={{ demo: 'https://example.com/demo2', repo: 'https://github.com/example/repo2' }} 
        />
      </section>
    </div>
  );
};

export default App;