import * as React from 'react';

const Info: React.SFC<{}> = () => (
  <div className="column column-40 flex-center">
    <h1 className="purple">create-cli-application</h1>
    <blockquote className="blue-quote">
      A bootstrapper for creating a cli application with Node.
    </blockquote>
    <span>15.6kB gzipped</span>
    <a
      className="purple"
      href="https://github.com/alexlee-dev/create-cli-application"
      rel="noopener noreferrer"
      target="_blank"
    >
      View Documentation
    </a>
  </div>
);

export default Info;
