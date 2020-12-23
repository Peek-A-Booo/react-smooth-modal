import * as React from 'react';

export interface CloseBtnProps {
  onClick?: () => void,
  isFullscreen: boolean
}

const FullscreenBtn: React.FC<CloseBtnProps> = ({ onClick, isFullscreen }) => {
  const href = isFullscreen ? '#icon-zuixiaohua' : '#icon-quanping';

  return (
    <div className="l-modal-fullscreen-btn" onClick={onClick}>
      <svg width="1em" height="1em" fill="currentColor">
        <use xlinkHref={href}></use>
      </svg>
    </div>
  );
};

export default FullscreenBtn;