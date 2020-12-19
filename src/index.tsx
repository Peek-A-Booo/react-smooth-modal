import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import './style.less';

/**
 * interface Props
 * @param children  子元素
 * @param visible   是否可见
 * @param draggable   是否可拖拽
 * @param width   弹框宽度
 * @function onCancel 取消
 */

export interface LModalProps {
  children?: React.ReactNode,
  visible?: boolean,
  draggable?: boolean, // 是否可拖拽
  width?: string | number,
  onCancel?: () => void,
}

const LModal: React.FC<LModalProps> = (props) => {
  const {
    children = <></>,
    visible = false,
    draggable = false,
    width = 500,
    onCancel
  } = props;

  const body: any = document.querySelector('body')

  if (!visible) {
    body.style.overflow = ''
    return null
  }

  body.style.overflow = 'hidden'
  return ReactDOM.createPortal(
    <Modal
      width={width}
      draggable={draggable}
      content={children}
      onCancel={onCancel}
    />
    , body)
}

export default LModal;