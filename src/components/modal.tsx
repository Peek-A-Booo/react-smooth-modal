import * as React from 'react';
import CloseBtn from './closeBtn';
import FullscreenBtn from './fullscreenBtn';

export interface ModalProps {
  borderRadius: number | string;
  cancelText: string;
  canFullscreen: boolean;
  centered: boolean;
  closable: boolean;
  content: React.ReactNode;
  draggable: boolean;
  escClosable: boolean;
  footer: React.ReactNode;
  maskClosable: boolean;
  onCancel?: () => void;
  onSure?: () => void;
  sureText: string;
  title: React.ReactNode | string;
  transitionClass: string;
  width: number | string;
  zIndex: number;
}

const Modal: React.FC<ModalProps> = props => {
  const {
    borderRadius,
    cancelText,
    canFullscreen,
    centered,
    closable,
    content,
    draggable,
    escClosable,
    footer,
    maskClosable,
    onCancel,
    onSure,
    sureText,
    title,
    transitionClass,
    width,
    zIndex,
  } = props;
  const body: any = document.querySelector('body');
  // let bodyOverflow: any = '';
  let windowWidth = 0;
  let windowHeight = 0;
  const modalRef: any = React.useRef();
  const [bodyOverflow, setBodyOverflow] = React.useState<any>('');
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [clientHeight, setClientHeight] = React.useState<number>(0);
  const [allowDrag, setAllowDrag] = React.useState<boolean>(false);
  const [isFullscreen, setFullscreen] = React.useState<boolean>(false);
  // 初始容器的位置
  const [initClientX, setInitClientX] = React.useState<number>(0);
  const [initClientY, setInitClientY] = React.useState<number>(0);
  // 现在容器的位置
  const [nowClientX, setNowClientX] = React.useState<number>(0);
  const [nowClientY, setNowClientY] = React.useState<number>(0);
  const [mouseX, setMouseX] = React.useState<number>(0);
  const [mouseY, setMouseY] = React.useState<number>(0);
  const [perX, setPerX] = React.useState<number>(1);
  const [perY, setPerY] = React.useState<number>(1);
  const allowDragRef = React.useRef(allowDrag);
  allowDragRef.current = allowDrag;

  // 只在第一次初始化点击的时候，初始化initX和initY(modal框的初始位置)
  const handleHeaderMouseDown = (e: any) => {
    if (!draggable) return;
    const style = modalRef.current.getBoundingClientRect();
    setClientWidth(style.width);
    setClientHeight(style.height);
    setAllowDrag(true);
    if (!initClientX && !initClientY) {
      setInitClientX(style.x);
      setInitClientY(style.y);
    }
    setNowClientX(style.x);
    setNowClientY(style.y);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleContainerMouseUp = () => {
    if (!draggable || !allowDrag) return;
    setAllowDrag(false);
  };

  const handleContainerMouseMove = (e: any) => {
    if (!draggable || !allowDragRef.current || isFullscreen) return;

    const scrollX = e.clientX - mouseX + nowClientX - initClientX - perX / 2;

    const scrollY = e.clientY - mouseY + nowClientY - initClientY - perY / 2;

    const calcX: any = scrollX - clientWidth / 2;
    const calcY: any = centered ? scrollY - clientHeight / 2 : scrollY;
    modalRef.current.style.transform = `translate3d(${parseInt(
      calcX
    )}px, ${parseInt(calcY)}px, 1px)`;
  };

  const handleResize = (e: any) => {
    setPerX(e.target.innerWidth - windowWidth);
    setPerY(e.target.innerHeight - windowHeight);
  };

  const handleClickMask = () => {
    if (maskClosable && onCancel) onCancel();
  };

  const handleKeyCode = (e: any) => {
    if (e.keyCode === 27 && onCancel) onCancel();
  };

  const handleFullscreen = () => {
    setFullscreen(!isFullscreen);
  };

  React.useEffect(() => {
    if (!body.style.overflow) {
      body.style.overflow = 'hidden';
    } else if (body.style.overflow !== 'hidden') {
      setBodyOverflow(body.style.overflow);
      body.style.overflow = 'hidden';
    } else {
      setBodyOverflow(body.style.overflow);
    }
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (draggable) window.addEventListener('resize', handleResize);
    if (escClosable) window.addEventListener('keydown', handleKeyCode);
    return () => {
      body.style.overflow = bodyOverflow;
      if (draggable) window.removeEventListener('resize', handleResize);
      if (escClosable) window.removeEventListener('keydown', handleKeyCode);
    };
  }, []);

  return (
    <div
      className="l-modal-container"
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
    >
      {zIndex}
      <div
        className={['l-modal-mask', transitionClass].join(' ')}
        style={{
          zIndex: zIndex !== 1001 ? zIndex : undefined,
        }}
        onClick={handleClickMask}
      />
      <div
        ref={modalRef}
        className={[
          'l-modal',
          transitionClass,
          isFullscreen ? 'l-modal-fullscreen' : '',
          centered ? 'l-modal-center' : '',
        ].join(' ')}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          width,
          borderRadius,
          zIndex: zIndex !== 1001 ? zIndex : undefined,
        }}
      >
        {closable && <CloseBtn onClick={onCancel} />}
        {canFullscreen && (
          <FullscreenBtn
            onClick={handleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}
        <div
          className="l-modal-header"
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
          onMouseDown={handleHeaderMouseDown}
        >
          <div className="l-modal-title">{title}</div>
        </div>
        <div className="l-modal-body">{content}</div>
        {footer === null ? null : (
          <div className="l-modal-footer">
            {footer || (
              <>
                <button className="l-modal-footer-btn" onClick={onCancel}>
                  {cancelText}
                </button>
                <button
                  className="l-modal-footer-btn l-modal-btn-primary"
                  onClick={onSure}
                >
                  {sureText}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
