import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Card from './components/Card/Card';
import CardInput from './components/CardInput/CardInput';
import StorageBuffer from './js/lib/model/buffer';
import { storage, Driller, Operator, Equipment, Project, Scheduler } from './js/js-library';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            InputObject: Driller,
            NewEmptyObject: new Driller(),
        };
        this.changeData = this.changeData.bind(this);
    }

    changeData(objType) {
        switch (objType) {
            case 'Project': this.setState({ InputObject: Project, NewEmptyObject: new Project() });
                break;
            case 'Driller': this.setState({ InputObject: Driller, NewEmptyObject: new Driller() });
                break;
            case 'Operator': this.setState({ InputObject: Operator, NewEmptyObject: new Operator() });
                break;
            case 'Equipment': this.setState({ InputObject: Equipment, NewEmptyObject: new Equipment() });
                break;
        }
    }

    render() {
        return (
          <div><header > <Navbar /> </header>
            <div className="container-fluid">
              <div className="row">
                <Sidebar changeData={this.changeData} objName={this.state.NewEmptyObject.constructor.name} />
                <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
                  <section className="row card-section">
                    <div className="col-sm-4">
                      <CardInput Obj={this.state.InputObject} NewEmptyObject={this.state.NewEmptyObject} changeData={this.changeData} />
                    </div>
                    <div className="col-sm-4">
                      <Card />
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
        );
    }
}


export default App;
