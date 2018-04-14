import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Card from './components/Card/Card';
import CardInput from './components/CardInput/CardInput';
import CardSection from './components/CardSection/CardSection';
import OverView from './components/OverView/OverView';
import { storage, Driller, Operator, Equipment, Project, scheduler } from './js/js-library';

class App extends Component {
    constructor(props) {
        super();
        this.state = {

        };
        this.state.dataView = false;
        this.changeData = this.changeData.bind(this);
    }

    changeData(objType, fullchange) {
        switch (objType) {
            case 'Project': this.setState({ InputObject: Project, NewEmptyObject: new Project(), dataView: true });
                break;
            case 'Driller': this.setState({ InputObject: Driller, NewEmptyObject: new Driller(), dataView: true });
                break;
            case 'Operator': this.setState({ InputObject: Operator, NewEmptyObject: new Operator(), dataView: true });
                break;
            case 'Equipment': this.setState({ InputObject: Equipment, NewEmptyObject: new Equipment(), dataView: true });
                break;
            case 'OverView': this.setState({ dataView: false });
        }
        this.setState({
            allDataChange: fullchange,
        });
    }

    render() {
        let objName = 'OverView';
        let dataView = (
          <OverView />
        );

        if (this.state.dataView) {
            dataView = (
              <CardSection
                Obj={this.state.InputObject}
                NewEmptyObject={this.state.NewEmptyObject}
                changeData={this.changeData}
                allDataChange={this.state.allDataChange}
                storageData={storage.all(this.state.InputObject)}
              />
            );
            objName = this.state.NewEmptyObject.constructor.name;
        }

        return (
          <div><header > <Navbar /> </header>
            <div className="container-fluid">
              <div className="row">
                <Sidebar changeData={this.changeData} objName={objName} />
                {dataView}
              </div>
            </div>
          </div>
        );
    }
}


export default App;
