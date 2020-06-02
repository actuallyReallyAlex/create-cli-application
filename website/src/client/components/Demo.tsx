import * as React from 'react';

import createApplication from '../demo/createApplication';
import entry from '../demo/entry';
import startApplication from '../demo/startApplication';

import { buttonContainerHeights } from '../constants';

const Demo: React.SFC<{}> = ({}) => {
  const [currentDemo, setCurrentDemo] = React.useState('entry');
  const [applicationCreated, setApplicationCreated] = React.useState(false);
  const [applicationStarted, setApplicationStarted] = React.useState(false);

  React.useEffect(() => {
    entry();
  }, []);

  return (
    <div className="column column-60 flex-center">
      <div id="demo" />
      <div
        id="demo-button-container"
        style={{ marginTop: buttonContainerHeights[currentDemo] }}
      >
        {!applicationCreated && currentDemo === 'entry' && (
          <button
            className="button"
            onClick={(): void =>
              createApplication({ setApplicationCreated, setCurrentDemo })
            }
          >
            Create Application
          </button>
        )}

        {applicationCreated && currentDemo === 'create' && (
          <button
            className="button"
            onClick={(): void =>
              startApplication({ setApplicationStarted, setCurrentDemo })
            }
          >
            Start Application
          </button>
        )}

        {applicationStarted && (
          <button
            className="button"
            onClick={(): void => {
              window.open(
                'https://github.com/alexlee-dev/create-cli-application',
                '_blank',
              );
            }}
          >
            View Documentation
          </button>
        )}
      </div>
    </div>
  );
};

export default Demo;
