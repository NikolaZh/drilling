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
        for (const item of data.owns) {
            listOfOwns.push(<a href="#" key={`href${item.id}`}>&laquo;{item.fields.name}&raquo;</a>);
            listOfOwns.push(', ');
        }
        delete listOfOwns[listOfOwns.length - 1];

        const ownDataToSelect = [];
        this.ownData.forEach((element, index) => { // pick up data of possible own objects and fill in select form
            ownDataToSelect.push(<option key={`option${element.id}`} value={index}>{element.fields.name}</option>);
        });
        let ownForm = [];
        let ownSaveKey = [];
        let ownPlusButton = (
          <a href="#" className="text-info"><span className="oi oi-plus" onClick={this.changeMount} /></a>
        );
        if (!this.state.ownSectionMount) {
            ownForm = [
              <td key="a">
                <form className="form-inline">
                  <select className="custom-select my-1 mr-sm-2" id="ownObj" defaultValue="Choose" onChange={this.handleSelectForm}>
                    <option defaultValue>Choose...</option>
                    {ownDataToSelect}
                  </select>
                  <input type="date" id="dateStart" className="form-control" onChange={this.handleSelectForm} />
                  <input type="date" id="dateEnd" className="form-control" onChange={this.handleSelectForm} />
                </form>
              </td>,
              <td key="b" />,
              <td key="c" />,
            ];
            ownSaveKey = [
              <td key="a"><a href="#" className="card-link text-success" onClick={this.saveOwnObject}><span className="oi oi-check" />Save</a></td>,
              <td key="b" />,
              <td key="c" />,
            ];
            ownPlusButton = (
              <a href="#" className="text-info"><span className="oi oi-minus" onClick={this.changeMount} /></a>
            );
        }

        return [
          <tr key="a">
            <th>{data.name}</th>
            <td>{listOfOwns}</td>
            <td>{ownPlusButton}</td>
          </tr>,
          <tr key="b">
            {ownForm}
          </tr>,
          <tr key="c">
            <th>
              {this.state.error}
            </th>
            <td />
            <td />
          </tr>,
          <tr key="d" >
            {ownSaveKey}
          </tr>,
        ];
    }
}


export default OwnSection;
