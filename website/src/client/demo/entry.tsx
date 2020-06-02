import GDemo from '@glorious/demo';

const entry = (): void => {
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
};

export default entry;
