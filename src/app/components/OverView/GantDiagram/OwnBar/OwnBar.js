import React from 'react';

const ownBar = props => (
  <div
    className="own-bar"
    style={{ marginLeft: `${props.marginLeft}%`, width: `${props.width}%` }}
  >
    {props.name}
  </div>
);

export default ownBar;
