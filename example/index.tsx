import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../.';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button style={{ width: 50, height: 30 }} onClick={() => setVisible(true)}>Open</button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        asf
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
