import * as React from 'react';

import Info from './components/Info';
import Demo from './components/Demo';

import useMedia from './hooks/useMedia';

const App: React.SFC<{}> = () => {
  const row = useMedia(
    ['(min-width: 1000px)', '(min-width: 600px)'],
    ['row', ''],
    '',
  );

  return (
    <div className="container">
      <div className={`${row} full-height`}>
        <Info />
        <Demo />
      </div>
    </div>
  );
};

export default App;
