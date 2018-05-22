import React from 'react';

const lineBar = (props) => {
    const lineBarMarginTop = props.height;
    const barDateMarginTop = lineBarMarginTop + 17.5;
    const barDateMarginLeft = props.marginLeft;
    return [
      <div
        className="line-bar"
        key="line-today"
        style={{ height: `${props.height}px`, marginLeft: `${props.marginLeft}%`, marginTop: `-${lineBarMarginTop}px` }}
      />,
      <div
        className="line-bar-date"
        key="line-today-date"
        style={{ marginTop: `-${barDateMarginTop}px`, marginLeft: `${barDateMarginLeft}%` }}
      >
             Today: {props.dateNow}
      </div>,
    ];
};


export default lineBar;
