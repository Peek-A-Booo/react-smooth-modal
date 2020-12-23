
<h1 align="center">React Smooth Modal</h1>

<div align="center">
    A Smooth Modal which can be fullscreen and draggable dialog for React.JS.
</div>

![gzip size](https://img.badgesize.io/https:/unpkg.com/react-smooth-modal@0.0.16/dist/react-smooth-modal.cjs.production.min.js?compression=gzip)


## Installation

```
 npm install react-smooth-modal
```

## Usage

Here is a example of react-smooth-modal being used in React with hooks: 

```tsx
 import Modal from 'react-smooth-modal';

 const App = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <Modal
                title="Test Title"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                哇哈哈
            </Modal>
        </div> 
    )
 }
```

## Documentation

Coming soon.

## Available props

| Name                  | Type               | Default       | Description                                         |
| --------------------- | ------------------ | ------------- | --------------------------------------------------- |
| afterClose            | function()         | -             | Callback when the modal close                       |
| borderRadius          | number / string    | 5px           | BorderRadius of modal container                     |
| cancelText            | string             | 取消           | The cancel button text                              |
| canFullscreen         | boolean            | false         | Whether the modal can fullscreen                    |
| closable              | boolean            | true          | Whether a close (x) button is visible or not        |
| draggable             | boolean            | false         | Can be draggable                                    |
| escClosable           | boolean            | true          | Whether support press esc to close                  |
| maskClosable          | boolean            | true          | Whether to close the modal when the mask is clicked |
| onCancel              | function()         | -             |                                                     |
| onSure                | function()         | -             |                                                     |
| sureText              | string             | 确定           | The sure button text                                |
| title                 | ReactNode / string | -             | The modal's title                                   |
| visible               | boolean            | false         | Whether the modal is visible or not                 |
| width                 | number / string    | 500px         | The modal's width                                   |