import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Card from './components/Card/Card';
import CardInput from './components/CardInput/CardInput';
import CardSection from './components/CardSection/CardSection';
import { storage, Driller, Operator, Equipment, Project, scheduler } from './js/js-library';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            InputObject: Driller,
            NewEmptyObject: new Driller(),
        };
        this.changeData = this.changeData.bind(this);
    }

    changeData(objType, fullchange) {
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
        this.setState({
            allDataChange: fullchange,
        });
    }

    render() {
        return (
          <div><header > <Navbar /> </header>
            <div className="container-fluid">
              <div className="row">
                <Sidebar changeData={this.changeData} objName={this.state.NewEmptyObject.constructor.name} />
                <CardSection
                  Obj={this.state.InputObject}
                  NewEmptyObject={this.state.NewEmptyObject}
                  changeData={this.changeData}
                  allDataChange={this.state.allDataChange}
                  storageData={storage.all(this.state.InputObject)}
                />
              </div>
            </div>
          </div>
        );
    }
}


export default App;
