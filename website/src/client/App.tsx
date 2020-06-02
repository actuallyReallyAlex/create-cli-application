import * as React from 'react';

import Info from './components/Info';
import Demo from './components/Demo';

const App: React.SFC<{}> = () => {
  return (
    <div className="container">
      <div className="row full-height">
        <Info />
        <Demo />
      </div>
    </div>
  );
};

export default App;
