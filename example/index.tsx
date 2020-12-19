import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../.';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div style={{height: 5000}}>
      <button style={{ width: 50, height: 30 }} onClick={() => setVisible(true)}>Open</button>
      <Modal
        title="弹出框么这是"
        visible={visible}
        onCancel={() => setVisible(false)}
        borderRadius="5px"
        width="800px"
      >
        asfd
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
