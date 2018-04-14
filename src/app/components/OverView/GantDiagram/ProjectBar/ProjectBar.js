import React, { Component } from 'react';

class ProjectBar extends Component {
    constructor(props) {
        super();
    }

    render() {
        const data = this.props;
        return (
          <div className="project-bar">
            <div className="row">
              <div className="col text-left">{data.dateStart}</div>
              <div className="col ">{data.name}</div>
              <div className="col text-right">{data.dateEnd}</div>
            </div>
          </div>
        );
    }
}

export default ProjectBar;
