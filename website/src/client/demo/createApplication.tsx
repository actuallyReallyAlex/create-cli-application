import GDemo from '@glorious/demo';
import { clearDemo } from './util';

const createApplication = ({ setApplicationCreated, setCurrentDemo }): void => {
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

export default createApplication;
