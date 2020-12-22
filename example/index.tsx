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
        title={<div>阿啥疯s 狂喝</div>}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSure={() => { console.log(124) }}
        borderRadius="5px"
        draggable={true}
      >
        <div style={{ height: 400 }}></div>
        <button onClick={handleSecond}>二层弹窗</button>
      </Modal>

      <Modal
        title="测试"
        visible={secondVisible}
        onCancel={() => setSecondVisible(false)}
      >
        哇哈哈
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
