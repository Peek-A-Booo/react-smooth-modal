import * as React from 'react';

export interface CloseBtnProps {
  onClick?: () => void;
}

const CloseBtn: React.FC<CloseBtnProps> = ({ onClick }) => {
  return (
    <div className="l-modal-close-btn" onClick={onClick}>
      <svg width="1em" height="1em" fill="currentColor">
        <use xlinkHref="#icon-close"></use>
      </svg>
    </div>
  );
};

export default CloseBtn;