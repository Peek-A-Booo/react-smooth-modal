import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../.';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const [secondVisible, setSecondVisible] = React.useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleSecond = () => {
    setSecondVisible(true);
  };

  const handleSure = async () => {
    console.log(123);
  };

  return (
    <div style={{ height: 5000 }}>
      <button style={{ width: 50, height: 30 }} onClick={handleClick}>Open</button>
      <Modal
        title={<div>Test Title</div>}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSure={handleSure}
        borderRadius="5px"
        draggable={false}
        maskClosable={true}
        escClosable={true}
        canFullscreen={true}
        centered={false}
        // footer={null}
        animated={true}
        bodyStyle={{ height: 50, overflow: 'auto' }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis quibusdam, repellat, velit quia provident laboriosam fuga eaque laudantium obcaecati dolorum mollitia rerum sapiente ad nemo quod exercitationem molestiae ducimus cumque.
        Dignissimos, labore, quaerat porro itaque quos maiores delectus voluptas eaque suscipit dolorum molestiae aspernatur fugiat id temporibus placeat? Deserunt deleniti nulla, fugiat nam maxime id. Mollitia eveniet at iusto laudantium?
        Provident explicabo deleniti quaerat ratione repellat ab aut, iusto ex fugiat harum molestiae aspernatur dolorum adipisci labore illum incidunt. Magni laboriosam blanditiis, aliquam dolores consectetur necessitatibus odit voluptate animi quibusdam!
        Repellat delectus ipsum, necessitatibus minima sint nihil ipsam doloremque asperiores soluta iste dolorem saepe modi. Hic rem eum non totam amet eligendi voluptatem nihil? Sint animi dignissimos iure dicta iusto?
        Placeat iusto a voluptates ad iure nulla esse unde illum, sequi sit enim sapiente ipsum. Architecto cupiditate, autem earum voluptas, laudantium maxime possimus rerum, quo laborum dignissimos vitae ipsum ea.
        Dolore animi rerum numquam! Quas, quam. Ex neque enim dolore explicabo magni quis molestias consequuntur impedit sapiente delectus nobis recusandae quaerat debitis, sequi repudiandae non quam excepturi autem voluptas ipsa.
        Consequatur vitae accusamus doloribus veritatis officia fugit eos tenetur consectetur ab vero iure accusantium unde obcaecati, nam eligendi dolores cum? Culpa enim dicta totam consectetur similique soluta repellat, laboriosam tempora!
        Vel enim ducimus molestiae at, excepturi quos cumque neque ex dolores et perspiciatis! Quisquam libero quasi dignissimos voluptas nisi perspiciatis quia laboriosam natus quos, officiis temporibus eligendi excepturi veritatis fugit!
        Voluptatem eum eius quod quo corrupti voluptates, laboriosam aut. Placeat deserunt unde ratione sed odio, illo adipisci animi magnam neque dicta perferendis ipsa, enim obcaecati! Qui eaque perspiciatis iure ullam?
        Omnis, debitis minima? Distinctio sint aspernatur mollitia suscipit maxime necessitatibus provident perferendis dolore! Omnis corrupti repellat reiciendis rerum sed, consectetur tempore officia, iure eligendi aspernatur mollitia cum nihil, quasi animi.
        <button onClick={handleSecond}>more modal</button>
      </Modal>

      <Modal
        title="test"
        visible={secondVisible}
        draggable={true}
        onCancel={() => setSecondVisible(false)}
      >
        Hello world!
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
