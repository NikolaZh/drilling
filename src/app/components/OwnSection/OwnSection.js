import React, { Component } from 'react';
import { scheduler } from '../../js/js-library';

class OwnSection extends Component {
    constructor(props) {
        super();
        this.state = {
            error: '',
        };
        this.state.ownSectionMount = true;
        this.handleSelectForm = this.handleSelectForm.bind(this);
        this.changeMount = this.changeMount.bind(this);
        this.saveOwnObject = this.saveOwnObject.bind(this);
        this.ownData = props.alldata;
        this.project = props.project;
    }

    handleSelectForm(e) {
        const property = e.target.id;
        const val = e.target.value;
        this.setState({
            [property]: val,
        });
    }

    changeMount() {
        for (const key of Object.keys(this.state)) {
            if (key !== 'ownSectionMount') delete this.state[key]; // clear state
        }
        this.setState({
            ownSectionMount: !this.state.ownSectionMount,
        });
        this.setState({
            error: '',
        });
    }

    saveOwnObject() {
        const ownObject = this.ownData[this.state.ownObj];
        const dateStart = new Date(this.state.dateStart);
        const dateEnd = new Date(this.state.dateEnd);
        try {
            scheduler.setObjToBusy(this.project, ownObject, dateStart, dateEnd);
            this.props.changeData(this.project.constructor.name, true);
            this.changeMount();
        } catch (e) {
            this.setState({
                error: e.toString(),
            });
        }
    }

    render() {
        const data = this.props;
        const listOfOwns = [];
        for (const element of data.owns) {
            if (element) {
                listOfOwns.push(<a href="#" key={`href${element.item.id}`}>&laquo;{element.item.fields.name}&raquo;</a>, ', ');
            }
        }
        listOfOwns.pop();

        const ownDataToSelect = [];
        this.ownData.forEach((element, index) => { // pick up data of possible own objects and fill in select form
            ownDataToSelect.push(<option key={`option${element.id}`} value={index}>{element.fields.name}</option>);
        });
        let ownForm = [];
        const ownSaveKey = [];
        let ownPlusButton = (
          <a href="#" className="text-info"><span className="oi oi-plus" onClick={this.changeMount} /></a>
        );
        if (!this.state.ownSectionMount) {
            ownForm = (
              <form className="form-inline">
                <select className="custom-select my-1 mr-sm-2" id="ownObj" defaultValue="Choose" onChange={this.handleSelectForm}>
                  <option defaultValue>Choose...</option>
                  {ownDataToSelect}
                </select>
                <input type="date" id="dateStart" className="form-control" onChange={this.handleSelectForm} />
                <input type="date" id="dateEnd" className="form-control" onChange={this.handleSelectForm} />
                <a href="#" className="card-link text-success mb-2 own-save-button" onClick={this.saveOwnObject}><span className="oi oi-check" />Save</a>
              </form>
            );
            ownPlusButton = <a href="#" className="text-info"><span className="oi oi-minus" onClick={this.changeMount} /></a>;
        }

        return [
          <tr key="a">
            <th>{data.name} {ownForm} {this.state.error}</th>
            <td>{listOfOwns}</td>
            <td>{ownPlusButton} </td>
          </tr>,
        ];
    }
}


export default OwnSection;
