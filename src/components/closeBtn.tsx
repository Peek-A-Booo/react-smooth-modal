import * as React from 'react';

export interface CloseBtnProps {
  onClick?: () => void;
}

const CloseBtn: React.FC<CloseBtnProps> = ({ onClick }) => {
  return (
    <div className="l-modal-close-btn" onClick={onClick}>
      <i className="iconfont icon-close"></i>
    </div>
  );
};

export default CloseBtn;
