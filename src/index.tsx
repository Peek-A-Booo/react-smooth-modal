import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal';
import './style/index.less';

export interface SModalProps {
  afterClose?: () => void;
  animated?: boolean;
  borderRadius?: number | string;
  cancelText?: string;
  canFullscreen?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
  closable?: boolean;
  draggable?: boolean;
  escClosable?: boolean;
  footer?: React.ReactNode;
  maskClosable?: boolean;
  onCancel?: () => void;
  onSure?: () => void;
  sureText?: string;
  title?: React.ReactNode | string;
  visible?: boolean;
  width?: number | string;
  zIndex?: number;
}

const LModal: React.FC<SModalProps> = props => {
  const {
    afterClose,
    animated = true,
    borderRadius = 5,
    cancelText = '取消',
    canFullscreen = false,
    centered = false,
    children = <></>,
    closable = true,
    draggable = false,
    escClosable = true,
    footer,
    maskClosable = true,
    onCancel,
    onSure,
    sureText = '确定',
    title = 'Modal',
    visible = false,
    width = 500,
    zIndex = 1001,
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
      if (!isInit) setIsInit(true);
      setIsShow(true);
      if (animated) {
        setTransitionClass('modal-fade-enter modal-fade-enter-active');
        if (enterTimeout) clearTimeout(enterTimeout);
        setEnterTimeout(
          setTimeout(() => {
            setTransitionClass('');
          }, 200)
        );
      }
    } else {
      if (isInit) {
        if (animated) {
          setTransitionClass('modal-fade-leave modal-fade-leave-active');
          if (enterTimeout) clearTimeout(enterTimeout);
          if (leaveTimeout) clearTimeout(leaveTimeout);
          setLeaveTimeout(
            setTimeout(() => {
              setTransitionClass('');
              setIsShow(false);
              if (isInit && afterClose) afterClose();
            }, 200)
          );
        } else {
          setIsShow(false);
          if (isInit && afterClose) afterClose();
        }
      }
    }
    return () => {
      // 清除timeout
      if (enterTimeout) clearTimeout(enterTimeout);
      if (leaveTimeout) clearTimeout(leaveTimeout);
    };
  }, [visible]);

  if (!isShow) return null;

  return ReactDOM.createPortal(
    <Modal
      borderRadius={borderRadius}
      cancelText={cancelText}
      canFullscreen={canFullscreen}
      centered={centered}
      closable={closable}
      content={children}
      draggable={draggable}
      escClosable={escClosable}
      footer={footer}
      maskClosable={maskClosable}
      onSure={onSure}
      onCancel={onCancel}
      sureText={sureText}
      title={title}
      transitionClass={transitionClass}
      width={width}
      zIndex={zIndex}
    />,
    body
  );
};

export default LModal;
