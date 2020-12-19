import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../.';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div style={{ height: 5000 }}>
      <button style={{ width: 50, height: 30 }} onClick={() => setVisible(true)}>Open</button>
      <Modal
        title={<div>阿啥疯狂喝</div>}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSure={() => { console.log(124) }}
        borderRadius="5px"
        width="800px"
      >
        asfd
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
