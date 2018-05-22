import React, { Component } from 'react';

const projectBar = props => (
  <div className="project-bar">
    <div className="row">
      <div className="col text-left">{props.dateStart}</div>
      <div className="col ">{props.name}</div>
      <div className="col text-right">{props.dateEnd}</div>
    </div>
  </div>
);

export default projectBar;
