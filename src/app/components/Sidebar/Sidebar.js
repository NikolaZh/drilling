import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
          <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Overview <span className="sr-only">(current)</span></a>
              </li>
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.props.changeData('Driller')}>Drillers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.props.changeData('Equipment')}>Equipment</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.props.changeData('Operator')}>Operators</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.props.changeData('Project')}>Projects</a>
              </li>
            </ul>

          </nav>
        );
    }
}


export default Sidebar;
