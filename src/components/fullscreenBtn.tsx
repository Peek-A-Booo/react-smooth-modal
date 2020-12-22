import * as React from 'react';

export interface CloseBtnProps {
  onClick?: () => void,
  isFullscreen: boolean
}

const FullscreenBtn: React.FC<CloseBtnProps> = ({ onClick, isFullscreen }) => {
  const d = isFullscreen
    ? 'M392.5 308.2V135.9c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v172.3H140.9c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h244c4.4 0 8-3.6 8-8v-72h-0.4zM633.2 308.2V135.9c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v172.3h171.7c4.4 0 8 3.6 8 8v64c0 4.4-3.6 8-8 8h-244c-4.4 0-8-3.6-8-8v-72h0.3zM392.5 707.9v172.3c0 4.4-3.6 8-8 8h-64c-4.4 0-8-3.6-8-8V707.9H140.9c-4.4 0-8-3.6-8-8v-64c0-4.4 3.6-8 8-8h244c4.4 0 8 3.6 8 8v72h-0.4zM633.2 707.9v172.3c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V707.9h171.7c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8h-244c-4.4 0-8 3.6-8 8v72h0.3z'
    : 'M177.074951 176.275749v168.222329c0 33.623795-22.717398 56.040341-56.301284 56.040341S64.472384 378.121873 64.472384 344.498078V120.336716c0-33.623795 22.717398-56.040341 56.301283-56.040341 2.39249 0 4.728698 0.113587 7.006578 0.336668h216.616526c33.583886 0 55.973826 22.197558 55.973826 55.821353s-22.38994 55.821353-55.973826 55.821353H177.074951z m0 673.142074h167.32182c33.583886 0 55.973826 22.197558 55.973826 55.821353s-22.38994 55.821353-55.973826 55.821353H120.501468c-30.227442 0-51.386344-17.98256-55.313793-46.093804a69.264527 69.264527 0 0 1-0.716315-10.06524V680.740122c0-33.623795 22.717398-56.040341 56.301284-56.04034s56.301284 22.416546 56.301284 56.04034v168.677701zM897.616568 64.633043a71.869864 71.869864 0 0 1 7.006578-0.336668c33.583886 0 56.301284 22.416546 56.301283 56.040341v224.161362c0 33.623795-22.717398 56.040341-56.301283 56.040341s-56.301284-22.416546-56.301284-56.040341V176.275749H680.238702c-33.583886 0-55.973826-22.197558-55.973826-55.821353s22.38994-55.821353 55.973826-55.821353h217.377866z m23.880897 894.231471c-5.361101 1.441838-11.172457 2.196015-17.364483 2.196015H680.238702c-33.583886 0-55.973826-22.197558-55.973826-55.821353s22.38994-55.821353 55.973826-55.821353h168.08316V680.740122c0-33.623795 22.717398-56.040341 56.301284-56.04034s56.301284 22.416546 56.301283 56.04034V904.902508c0.001023 27.623128-15.332197 47.681976-39.426964 53.962006z'

  return (
    <div className="l-modal-fullscreen-btn" onClick={onClick}>
      <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor">
        <path d={d} />
      </svg>
    </div>
  )
}

export default FullscreenBtn;