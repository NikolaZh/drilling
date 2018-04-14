import React, { Component } from 'react';

class LineBar extends Component {
    constructor(props) {
        super();
    }

    render() {
        const data = this.props;
        const lineBarMarginTop = data.height;
        const barDateMarginTop = lineBarMarginTop + 17.5;
        const barDateMarginLeft = data.marginLeft;
        return [
          <div className="line-bar" key="line-today" style={{ height: `${data.height}px`, marginLeft: `${data.marginLeft}%`, marginTop: `-${lineBarMarginTop}px` }} />,
          <div className="line-bar-date" key="line-today-date" style={{ marginTop: `-${barDateMarginTop}px`, marginLeft: `${barDateMarginLeft}%` }}> Today: {data.dateNow} </div>,
        ];
    }
}

export default LineBar;
