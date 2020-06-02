import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import useMedia from '../hooks/useMedia';

const Info: React.SFC<{}> = () => {
  const columnSize = useMedia(
    ['(min-width: 1000px)', '(min-width: 600px)'],
    ['column-40', ''],
    '',
  );

  return (
    <div
      className={`column ${columnSize} flex-center ${
        columnSize === '' && 'margin-bottom-md margin-top-lg'
      }`}
    >
      <h1 className="purple">create-cli-application</h1>
      <blockquote className="blue-quote">
        A bootstrapper for creating a cli application with Node.
      </blockquote>
      <span className="badge">
        <FontAwesomeIcon icon={faBox} />
        <span className="margin-left-sm">15.6kb gzipped</span>
      </span>
      <a
        className="purple"
        href="https://github.com/alexlee-dev/create-cli-application"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
        <span className="margin-left-sm">View Documentation</span>
      </a>
    </div>
  );
};

export default Info;
