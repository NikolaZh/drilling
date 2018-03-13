import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    navlink(a, b) {
        if (a === b) {
            return 'nav-link active';
        } return 'nav-link';
    }

    render() {
        const data = this.props;
        const objName = data.objName;

        return (
          <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className="nav-link" href="#">Overview <span className="sr-only">(current)</span></a>
              </li>
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className={this.navlink(objName, 'Driller')} href="#" onClick={() => data.changeData('Driller')}>Drillers</a>
              </li>
              <li className="nav-item">
                <a className={this.navlink(objName, 'Equipment')} href="#" onClick={() => data.changeData('Equipment')}>Equipment</a>
              </li>
              <li className="nav-item">
                <a className={this.navlink(objName, 'Operator')} href="#" onClick={() => data.changeData('Operator')}>Operators</a>
              </li>
              <li className="nav-item">
                <a className={this.navlink(objName, 'Project')} href="#" onClick={() => data.changeData('Project')}>Projects</a>
              </li>
            </ul>

          </nav>
        );
    }
}


export default Sidebar;
