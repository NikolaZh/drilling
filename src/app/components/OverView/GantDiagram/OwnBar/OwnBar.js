import React, { Component } from 'react';

class OwnBar extends Component {
    constructor(props) {
        super();
    }

    render() {
        const data = this.props;
        return (
          <div className="own-bar" style={{ marginLeft: `${data.marginLeft}%`, width: `${data.width}%` }}>
            {data.name}
          </div>
        );
    }
}

export default OwnBar;
