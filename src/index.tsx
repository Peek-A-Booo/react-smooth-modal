import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal';

/**
 * interface Props
 * @param children  子元素
 * @param visible   是否可见
 * @param draggable   是否可拖拽
 * @param width   弹框宽度
 * @param title   头部
 * @function onCancel 取消
 */

export interface LModalProps {
  children?: React.ReactNode,
  visible?: boolean,
  draggable?: boolean, // 是否可拖拽
  width?: number | string,
  onCancel?: () => void,
  onSure?: () => void,
  borderRadius?: number | string,  // Number(5) || 5px
  title?: React.ReactNode
}

const LModal: React.FC<LModalProps> = (props) => {
  const {
    children = <></>,
    visible = false,
    draggable = false,
    width = 500,
    title = 'Modal',
    borderRadius = 5,
    onCancel,
    onSure
  } = props;

  const body: any = document.querySelector('body')
  // 是否展示组件
  const [isShow, setIsShow] = React.useState<boolean>(false);
  // 组件动画class
  const [transitionClass, setTransitionClass] = React.useState<string>('');
  const [enterTimeout, setEnterTimeout] = React.useState<any>();
  const [leaveTimeout, setLeaveTimeout] = React.useState<any>();

  React.useEffect(() => {
    if (visible) {
      setIsShow(true)
      body.style.overflow = 'hidden'
      setTransitionClass('modal-fade-enter modal-fade-enter-active')
      if (enterTimeout) clearTimeout(enterTimeout)
      setEnterTimeout(setTimeout(() => {
        setTransitionClass('')
      }, 200))
    } else {
      setTransitionClass('modal-fade-leave modal-fade-leave-active')
      if (leaveTimeout) clearTimeout(leaveTimeout)
      setLeaveTimeout(setTimeout(() => {
        setTransitionClass('')
        setIsShow(false)
        body.style.overflow = ''
      }, 200))
    }

    return () => {
      // 清除timeout
      if (enterTimeout) clearTimeout(enterTimeout)
      if (leaveTimeout) clearTimeout(leaveTimeout)
    }
  }, [visible])

  if (!isShow) return null

  return ReactDOM.createPortal(
    <Modal
      width={width}
      draggable={draggable}
      content={children}
      onCancel={onCancel}
      onSure={onSure}
      title={title}
      transitionClass={transitionClass}
      borderRadius={borderRadius}
    />
    , body)
}

export default LModal;