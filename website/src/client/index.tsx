import * as React from 'react';
import ReactDOM from 'react-dom';
import GDemo from '@glorious/demo';
import './index.css';

const App = () => {
  const [currentDemo, setCurrentDemo] = React.useState('entry');
  const [applicationCreated, setApplicationCreated] = React.useState(false);
  const [applicationStarted, setApplicationStarted] = React.useState(false);

  const clearDemo = () => {
    const childNode = document.getElementById('demo').firstChild;
    document.getElementById('demo').removeChild(childNode);
  };

  const createApplication = () => {
    clearDemo();
    setCurrentDemo('create');
    const demo = new GDemo('#demo');

    demo
      .openApp('terminal', {
        minHeight: '506px',
        promptString: '$',
        windowTitle: 'create-cli-application',
      })
      .command('create-cli-application cool-app', { onCompleteDelay: 500 })
      .respond(
        `<div>Creating a new CLI app in <span class="terminal-blue">/cool-app</span>`,
      )
      .respond(
        `<div>Source Language: <span class="terminal-blue">JavaScript</span>`,
      )
      .respond(
        `<div><span class="terminal-green">✔</span> Application Directory and package.json created successfully`,
        {
          onCompleteDelay: 1250,
        },
      )
      .respond(
        `<div><span class="terminal-green">✔</span> Dependencies installed successfully`,
        {
          onCompleteDelay: 1250,
        },
      )
      .respond(
        `<div><span class="terminal-green">✔</span> DevDependencies installed successfully`,
        {
          onCompleteDelay: 1250,
        },
      )
      .respond(
        `<div><span class="terminal-green">✔</span> Template files copied successfully`,
        {
          onCompleteDelay: 1250,
        },
      )
      .respond(
        `<div><span class="terminal-green">✔</span> Values in template files replaced successfully`,
        {
          onCompleteDelay: 1250,
        },
      )
      .respond(
        `<div><span class="terminal-green">Success!</span> Created <span class="terminal-blue">cool-app</span> at <span class="terminal-blue">/cool-app</span>`,
      )
      .respond(`Inside that directory, you can run several commands:`)
      .respond(
        `<div><span class="terminal-blue terminal-margin">npm run build</span>`,
      )
      .respond(`   Creates a local build.`)
      .respond(
        `<div><span class="terminal-blue terminal-margin">  npm start</span>`,
      )
      .respond(`   Starts the application in the terminal.`)
      .respond(`We suggest that you begin by typing:`)
      .respond(
        `<div><span class="terminal-blue termninal-margin">  cd /cool-app</span>`,
      )
      .respond(
        `<div><span class="terminal-blue terminal-margin">  npm run build && npm start</span>`,
      )
      .respond(`<div><span class="terminal-blue">Happy CLI creating!</span>`)
      .respond('Start your application ...')
      .command('')
      .end()
      .then(() => setApplicationCreated(true));
  };

  const startApplication = () => {
    clearDemo();
    setCurrentDemo('start');
    const demo = new GDemo('#demo');

    demo
      .openApp('terminal', {
        minHeight: '482px',
        promptString: '$',
        windowTitle: 'create-cli-application',
      })
      .command('cd cool-app')
      .command('npm run build && npm start', {
        onCompleteDelay: 1000,
        promptString: 'cool-app/$',
      })
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            ╭───────────────────────────────────────────────╮</span></div>`,
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            │                     </span><span class="terminal-blue terminal-no-wrap">__                        </span><span class="terminal-purple">│</span></div>`,
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            │   </span><span class="terminal-blue terminal-no-wrap">_________  ____  / /     ____ _____  ____   </span><span class="terminal-purple">│</span></div>`,
      )
      .respond(
        "<div><span class='terminal-purple terminal-no-wrap'>            │  </span><span class='terminal-blue terminal-no-wrap'>/ ___/ __ \\/ __ \\/ /_____/ __ `/ __ \\/ __  \\ </span><span class='terminal-purple'>│</span></div>",
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            │ </span><span class="terminal-blue terminal-no-wrap">/ /__/ /_/ / /_/ / /_____/ /_/ / /_/ / /_/ /  </span><span class="terminal-purple">│</span></div>`,
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            │ </span><span class="terminal-blue terminal-no-wrap">\\___/\\____/\\____/_/      \\__,_/ .___/ .___/   </span><span class="terminal-purple">│</span></div>`,
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            │                              </span><span class="terminal-blue terminal-no-wrap">/_/   /_/        </span><span class="terminal-purple">│</span></div>`,
      )
      .respond(
        `<div><span class="terminal-purple terminal-no-wrap">            ╰───────────────────────────────────────────────╯</span></div>`,
      )
      .respond(
        `<div><span class="terminal-green">?</span> <span class="terminal-white">Main Menu</span> (Use arrow keys)</div>`,
      )
      .respond(`<div><span class="terminal-blue">❯ Option 1'</span></div>`)
      .respond('  Option 2')
      .respond('  Option 3')
      .respond('  ──────────────')
      .respond('  About')
      .respond('  Exit')
      .command('')
      .end()
      .then(() => setApplicationStarted(true));
  };

  React.useEffect(() => {
    const demo = new GDemo('#demo');

    demo
      .openApp('terminal', {
        minHeight: '300',
        promptString: '$',
        windowTitle: 'create-cli-application',
      })
      .respond('Create an application ...')
      .command('')
      .end();
  }, []);

  const buttonContainerHeights = {
    entry: '350px',
    create: '556px',
    start: '506px',
  };

  return (
    <div className="container">
      <div className="row full-height">
        <div className="column column-40 flex-center">
          <h1>create-cli-application</h1>
          <blockquote>
            A bootstrapper for creating a cli application with Node.
          </blockquote>
          <span>15.6kB gzipped</span>
          <a
            href="https://github.com/alexlee-dev/create-cli-application"
            rel="noopener noreferrer"
            target="_blank"
          >
            View Documentation
          </a>
        </div>
        <div className="column column-60 flex-center">
          <div id="demo" />
          <div
            id="demo-button-container"
            style={{ marginTop: buttonContainerHeights[currentDemo] }}
          >
            {!applicationCreated && currentDemo === 'entry' && (
              <button className="button" onClick={createApplication}>
                Create Application
              </button>
            )}

            {applicationCreated && currentDemo === 'create' && (
              <button className="button" onClick={startApplication}>
                Start Application
              </button>
            )}

            {applicationStarted && (
              <button
                className="button"
                onClick={() =>
                  window.open(
                    'https://github.com/alexlee-dev/create-cli-application',
                    '_blank',
                  )
                }
              >
                View Documentation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
