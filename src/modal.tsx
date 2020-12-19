import * as React from 'react';
import './style.less';

export interface ModalProps {
  content: React.ReactNode,
  onCancel?: () => void,
  width: number | string,
  borderRadius?: number | string,
  draggable: boolean
}

const CloseBtn = ({ onClick }: any) => {
  return (
    <div className="l-modal-close" onClick={onClick}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2981" width="30" height="30"><path d="M517.08411984 479.11475483L301.90637831 263.93753776a26.85237631 26.85237631 0 1 0-37.98667221 37.95153335l215.17669262 215.19504873L263.91970607 732.27864411a26.85237631 26.85237631 0 1 0 37.96936504 37.96884057l215.19504878-215.17669264 215.19504866 215.17669264a26.85237631 26.85237631 0 1 0 37.9688406-37.95100889l-215.17669262-215.2123559 215.17669262-215.1772171a26.85237631 26.85237631 0 1 0-37.9688406-37.96936505L517.10195147 479.11475483z" fill="#8a8a8a" p-id="2982"></path></svg>
    </div>
  )
}

const Modal: React.FC<ModalProps> = (props) => {

  const {
    content,
    onCancel,
    width,
    borderRadius = 5
  } = props;

  let windowWidth = 0
  let windowHeight = 0
  const modalRef: any = React.useRef();
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [isEnterActive, setEnterActive] = React.useState<boolean>(false);
  const [isLeaveActive, setLeaveActive] = React.useState<boolean>(false);
  const [allowDrag, setAllowDrag] = React.useState<boolean>(false);
  const [initClientX, setInitClientX] = React.useState<number>(0);    // 初始容器的位置
  const [initClientY, setInitClientY] = React.useState<number>(0);
  const [nowClientX, setNowClientX] = React.useState<number>(0);      // 现在容器的位置
  const [nowClientY, setNowClientY] = React.useState<number>(0);
  const [mouseX, setMouseX] = React.useState<number>(0);
  const [mouseY, setMouseY] = React.useState<number>(0);
  const [perX, setPerX] = React.useState<number>(1);
  const [perY, setPerY] = React.useState<number>(1);
  const [enterTimeout, setEnterTimeout] = React.useState();
  const [leaveTimeout, setLeaveTimeout] = React.useState();
  const allowDragRef = React.useRef(allowDrag);
  allowDragRef.current = allowDrag;
  const enterTimeoutRef = React.useRef(enterTimeout);
  enterTimeoutRef.current = enterTimeout;
  const leaveTimeoutRef = React.useRef(leaveTimeout);
  leaveTimeoutRef.current = leaveTimeout;

  const handleClickContainer = () => {
    if (!onCancel) return
    setLeaveActive(true)
    const timeout: any = setTimeout(_ => {
      setLeaveActive(false)
      onCancel()
    }, 200)
    setLeaveTimeout(timeout)
  }

  // 只在第一次初始化点击的时候，初始化initX和initY(modal框的初始位置)
  const handleHeaderMouseDown = (e: any) => {
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
    if (!allowDrag) return
    setAllowDrag(false)
  }

  const handleContainerMouseMove = (e: any) => {
    if (!allowDragRef.current) return
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
    window.addEventListener('resize', handleResize)
    setEnterActive(true)
    const timeout: any = setTimeout(_ => {
      setEnterActive(false)
    }, 200)
    setEnterTimeout(timeout)

    return () => {
      // 清除timeout
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current)
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="l-modal-container" onMouseMove={handleContainerMouseMove} onMouseUp={handleContainerMouseUp}>
      <div
        className={[
          'l-modal-mask',
          isEnterActive && 'modal-fade-enter modal-fade-enter-active',
          isLeaveActive && 'modal-fade-leave modal-fade-leave-active'
        ].join(' ')}
        onClick={handleClickContainer}
      />
      <div
        ref={modalRef}
        className={[
          'l-modal',
          isEnterActive && 'modal-fade-enter modal-fade-enter-active',
          isLeaveActive && 'modal-fade-leave modal-fade-leave-active'
        ].join(' ')}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          width,
          borderRadius,
        }}
      >
        <CloseBtn onClick={handleClickContainer} />
        <div
          className="l-modal-header"
          onMouseDown={handleHeaderMouseDown}
        >头部</div>
        <div className="l-modal-body">
          {content}
        </div>
        <div className="l-modal-footer">底部</div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  width: 500
}

export default Modal;