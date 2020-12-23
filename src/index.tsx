import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal';

export interface SModalProps {
  afterClose?: () => void,
  borderRadius?: number | string,
  cancelText?: string,
  canFullscreen?: boolean,
  children?: React.ReactNode,
  closable?: boolean,
  draggable?: boolean,
  escClosable?: boolean,
  maskClosable?: boolean
  onCancel?: () => void,
  onSure?: () => void,
  sureText?: string,
  title?: React.ReactNode | string,
  visible?: boolean,
  width?: number | string,
}

const LModal: React.FC<SModalProps> = (props) => {
  const {
    afterClose,
    borderRadius = 5,
    cancelText = '取消',
    canFullscreen = false,
    children = <></>,
    closable = true,
    draggable = false,
    escClosable = true,
    maskClosable = true,
    onCancel,
    onSure,
    sureText = '确定',
    title = 'Modal',
    visible = false,
    width = 500,
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

  React.useEffect(() => {
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
      borderRadius={borderRadius}
      cancelText={cancelText}
      canFullscreen={canFullscreen}
      closable={closable}
      content={children}
      draggable={draggable}
      escClosable={escClosable}
      maskClosable={maskClosable}
      onSure={onSure}
      onCancel={onCancel}
      sureText={sureText}
      title={title}
      transitionClass={transitionClass}
      width={width}
    />
    , body)
}

export default LModal;