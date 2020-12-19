import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LModal from '../.';
import '../dist/react-smooth-modal.min.css';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(true)}>124</button>
      <LModal
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        asf
      </LModal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
