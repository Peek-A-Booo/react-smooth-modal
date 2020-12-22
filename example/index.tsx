import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../.';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const [secondVisible, setSecondVisible] = React.useState(false);
  const handleSecond = () => {
    setSecondVisible(true)
  }
  return (
    <div style={{ height: 5000 }}>
      <button style={{ width: 50, height: 30 }} onClick={() => setVisible(true)}>Open</button>
      <Modal
        title={<div>Test Title</div>}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSure={() => { console.log(124) }}
        borderRadius="5px"
        draggable={true}
        maskClosable={true}
        escClosable={false}
        closable={false}
        canFullscreen={true}
      >
        <button onClick={handleSecond}>more modal</button>
      </Modal>

      <Modal
        title="test"
        visible={secondVisible}
        onCancel={() => setSecondVisible(false)}
      >
        Hello world!
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
