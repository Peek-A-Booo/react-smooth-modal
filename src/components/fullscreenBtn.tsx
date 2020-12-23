import * as React from 'react';

export interface CloseBtnProps {
  onClick?: () => void;
  isFullscreen: boolean;
}

const FullscreenBtn: React.FC<CloseBtnProps> = ({ onClick, isFullscreen }) => {
  const href = isFullscreen ? 'icon-zuixiaohua' : 'icon-quanping';

  return (
    <div className="l-modal-fullscreen-btn" onClick={onClick}>
      <i className={['iconfont', href].join(' ')}></i>
    </div>
  );
};

export default FullscreenBtn;
