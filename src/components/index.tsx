import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

/**
 * interface Props
 * @param children  子元素
 * @param visible   是否可见
 * @param draggable   是否可拖拽
 * @param width   弹框宽度
 * @param title   头部
 * @function onCancel 取消
 */

export interface SModalProps {
  afterClose?: () => void,
  borderRadius?: number | string,  // Number(5) || 5px
  children?: React.ReactNode,
  draggable?: boolean, // 是否可拖拽
  maskClosable?: boolean
  onCancel?: () => void,
  onSure?: () => void,
  title?: React.ReactNode | string,
  visible?: boolean,
  width?: number | string,
}

const LModal: React.FC<SModalProps> = (props) => {
  const {
    children = <></>,
    visible = false,
    draggable = false,
    width = 500,
    title = 'Modal',
    borderRadius = 5,
    onCancel,
    afterClose,
    maskClosable = true,
    onSure
  } = props;
  const body: any = document.querySelector('body');
  // 是否初始化过后已经被调用过了
  const [isInit, setIsInit] = React.useState<boolean>(false);
  // 是否展示组件
  const [isShow, setIsShow] = React.useState<boolean>(false);
  // 组件动画class
  const [transitionClass, setTransitionClass] = React.useState<string>('');
  const [enterTimeout, setEnterTimeout] = React.useState<any>();
  const [leaveTimeout, setLeaveTimeout] = React.useState<any>();
  // const [bodyOverflow, setBodyOverflow] = React.useState<any>();
  // const bodyOverflowRef = React.useRef(bodyOverflow);
  // bodyOverflowRef.current = bodyOverflow;

  React.useEffect(() => {
    // if (body.style.overflow && !bodyOverflowRef.current) setBodyOverflow(body.style.overflow)
    if (visible) {
      // 判断是否初始化过后已经被调用过了
      if (!isInit) setIsInit(true)
      setIsShow(true)
      // body.style.overflow = 'hidden'
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
        // body.style.overflow = bodyOverflowRef.current || ''
        if (isInit && afterClose) afterClose()
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
      content={children}
      borderRadius={borderRadius}
      draggable={draggable}
      maskClosable={maskClosable}
      onSure={onSure}
      onCancel={onCancel}
      title={title}
      transitionClass={transitionClass}
      width={width}
    />
    , body)
}

export default LModal;