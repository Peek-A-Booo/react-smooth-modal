import * as React from 'react';
import CloseBtn from './closeBtn';
import '../style/index.less';

export interface ModalProps {
  content: React.ReactNode,
  onCancel?: () => void,
  onSure?: () => void,
  width: number | string,
  borderRadius: number | string,
  draggable: boolean,
  title: React.ReactNode,
  transitionClass: string
}

const Modal: React.FC<ModalProps> = (props) => {

  const {
    content,
    onCancel,
    onSure,
    width,
    borderRadius,
    title,
    transitionClass,
    draggable
  } = props;

  let windowWidth = 0
  let windowHeight = 0
  const modalRef: any = React.useRef();
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [allowDrag, setAllowDrag] = React.useState<boolean>(false);
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
    if (!draggable || !allowDragRef.current) return
    const scrollX = (e.clientX - mouseX + (nowClientX - initClientX)) - perX / 2
    const scrollY = (e.clientY - mouseY + (nowClientY - initClientY)) - perY / 2
    modalRef.current.style.transform = `translate3d(${scrollX - (clientWidth / 2)}px, ${scrollY}px, 1px)`
  }

  const handleResize = (e: any) => {
    setPerX(e.target.innerWidth - windowWidth)
    setPerY(e.target.innerHeight - windowHeight)
  }

  React.useEffect(() => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    if (draggable) window.addEventListener('resize', handleResize)
    return () => {
      if (draggable) window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="l-modal-container" onMouseMove={handleContainerMouseMove} onMouseUp={handleContainerMouseUp}>
      <div className={['l-modal-mask', transitionClass].join(' ')} onClick={onCancel} />
      <div
        ref={modalRef}
        className={['l-modal', transitionClass].join(' ')}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          width,
          borderRadius,
        }}
      >
        <CloseBtn onClick={onCancel} />
        <div className="l-modal-header" onMouseDown={handleHeaderMouseDown}>
          <div className="l-modal-title">{title}</div>
        </div>
        <div className="l-modal-body">{content}</div>
        <div className="l-modal-footer">
          <button className="l-modal-footer-btn" onClick={onCancel}>取消</button>
          <button className="l-modal-footer-btn l-modal-btn-primary" onClick={onSure}>确定</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;