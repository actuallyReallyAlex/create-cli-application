import GDemo from '@glorious/demo';
import { clearDemo } from './util';

const startApplication = ({ setApplicationStarted, setCurrentDemo }): void => {
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

export default startApplication;
