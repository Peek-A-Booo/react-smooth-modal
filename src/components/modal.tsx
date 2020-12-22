import * as React from 'react';
import CloseBtn from './closeBtn';
import FullscreenBtn from './fullscreenBtn';
import '../style/index.less';

export interface ModalProps {
  borderRadius: number | string,
  cancelText: string,
  canFullscreen: boolean,
  closable: boolean,
  content: React.ReactNode,
  draggable: boolean,
  escClosable: boolean,
  maskClosable: boolean
  onCancel?: () => void,
  onSure?: () => void,
  sureText: string,
  title: React.ReactNode | string,
  transitionClass: string,
  width: number | string,
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    borderRadius,
    cancelText,
    canFullscreen,
    closable,
    content,
    draggable,
    escClosable,
    maskClosable,
    onCancel,
    onSure,
    sureText,
    title,
    transitionClass,
    width,
  } = props;
  const body: any = document.querySelector('body');
  let bodyOverflow: any = ''
  let windowWidth = 0
  let windowHeight = 0
  const modalRef: any = React.useRef();
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [allowDrag, setAllowDrag] = React.useState<boolean>(false);
  const [isFullscreen, setFullscreen] = React.useState<boolean>(false);
  const [initClientX, setInitClientX] = React.useState<number>(0);    // 初始容器的位置
  const [initClientY, setInitClientY] = React.useState<number>(0);
  const [nowClientX, setNowClientX] = React.useState<number>(0);      // 现在容器的位置
  const [nowClientY, setNowClientY] = React.useState<number>(0);
  const [mouseX, setMouseX] = React.useState<number>(0);
  const [mouseY, setMouseY] = React.useState<number>(0);
  const [perX, setPerX] = React.useState<number>(1);
  const [perY, setPerY] = React.useState<number>(1);
  const allowDragRef = React.useRef(allowDrag);
  allowDragRef.current = allowDrag;

  // 只在第一次初始化点击的时候，初始化initX和initY(modal框的初始位置)
  const handleHeaderMouseDown = (e: any) => {
    if (!draggable) return
    const style = modalRef.current.getBoundingClientRect()
    setClientWidth(style.width)
    setAllowDrag(true)
    if (!initClientX && !initClientY) {
      setInitClientX(style.x)
      setInitClientY(style.y)
    }
    setNowClientX(style.x)
    setNowClientY(style.y)
    setMouseX(e.clientX)
    setMouseY(e.clientY)
  }

  const handleContainerMouseUp = () => {
    if (!draggable || !allowDrag) return
    setAllowDrag(false)
  }

  const handleContainerMouseMove = (e: any) => {
    if (!draggable || !allowDragRef.current || isFullscreen) return
    const scrollX: any = (e.clientX - mouseX + (nowClientX - initClientX)) - perX / 2
    const scrollY: any = (e.clientY - mouseY + (nowClientY - initClientY)) - perY / 2
    const num1: any = scrollX - (clientWidth / 2)
    modalRef.current.style.transform = `translate3d(${parseInt(num1)}px, ${parseInt(scrollY)}px, 1px)`
  }

  const handleResize = (e: any) => {
    setPerX(e.target.innerWidth - windowWidth)
    setPerY(e.target.innerHeight - windowHeight)
  }

  const handleClickMask = () => {
    if (maskClosable && onCancel) onCancel()
  }

  const handleKeyCode = (e: any) => {
    if (e.keyCode === 27 && onCancel) onCancel()
  }

  const handleFullscreen = () => {
    setFullscreen(!isFullscreen)
  }

  React.useEffect(() => {
    if (!body.style.overflow) {
      body.style.overflow = 'hidden'
    } else if (body.style.overflow !== 'hidden') {
      bodyOverflow = body.style.overflow
      body.style.overflow = 'hidden'
    } else {
      bodyOverflow = body.style.overflow
    }
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    if (draggable) window.addEventListener('resize', handleResize)
    if (escClosable) window.addEventListener('keydown', handleKeyCode)
    return () => {
      body.style.overflow = bodyOverflow
      if (draggable) window.removeEventListener('resize', handleResize)
      if (escClosable) window.removeEventListener('keydown', handleKeyCode)
    }
  }, [])

  return (
    <div
      className="l-modal-container"
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
    >
      <div className={['l-modal-mask', transitionClass].join(' ')} onClick={handleClickMask} />
      <div
        ref={modalRef}
        className={[
          'l-modal',
          transitionClass,
          isFullscreen ? 'l-modal-fullscreen' : ''
        ].join(' ')}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          width,
          borderRadius,
        }}
      >
        {closable && <CloseBtn onClick={onCancel} />}
        {canFullscreen && <FullscreenBtn onClick={handleFullscreen} isFullscreen={isFullscreen} />}
        <div
          className="l-modal-header"
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius
          }}
          onMouseDown={handleHeaderMouseDown}
        >
          <div className="l-modal-title">{title}</div>
        </div>
        <div className="l-modal-body">{content}</div>
        <div className="l-modal-footer">
          <button className="l-modal-footer-btn" onClick={onCancel}>{cancelText}</button>
          <button className="l-modal-footer-btn l-modal-btn-primary" onClick={onSure}>{sureText}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;