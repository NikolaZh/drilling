import React, { Component } from 'react';
import CardTitle from './CardTitle/CardTitle';
import { storage } from '../../js/js-library';

class CardInput extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {};
        this.state = this.stateFromProps(props.Obj.fields);
        this.state.CardInputMount = true;
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.saveObject = this.saveObject.bind(this);
        this.changeMount = this.changeMount.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        for (const key of Object.keys(this.state)) { // maybe not necessary
            delete this.state[key];
        }
        const state = this.stateFromProps(nextProps.Obj.fields);
        this.setState(state);
    }

    stateFromProps(props) {
        const state = Object.keys(props).reduce((obj, cur) => {
            obj[cur] = '';
            return obj;
        }, {});
        state.CardInputMount = true;
        return state;
    }

    changeMount() {
        this.setState({
            CardInputMount: !this.state.CardInputMount,
        });
    }

    handleChangeForm(e) {
        const property = e.target.name;
        const val = e.target.value;
        this.setState({
            [property]: val,
        });
    }

    saveObject() {
        this.changeMount();
        const NewObject = this.props.NewEmptyObject;

        for (const key in this.state) {
            if (key !== 'CardInputMount') {
                NewObject.fields[key] = this.state[key];
            }
        }

        console.log(NewObject);
        storage.save(NewObject);
    }

    render() {
        const data = this.props;
        const NewObject = data.NewEmptyObject;
        let inputForm = (
          <div className="card">
            <div className="card-header text-primary" >
                Successful Saved!
             </div>
            <div className="card-body card-content-small" >
            Your {NewObject.constructor.name} was added to database
            </div>

            <div className="card-body">
              <a href="#" className="card-link text-info" onClick={() => data.changeData(NewObject.constructor.name)}><span className="oi oi-check" /> Add New</a>
            </div>
          </div>
        );

        if (this.state.CardInputMount) {
            inputForm = (
              <div className="card">
                <div className="card-body card-content-small">
                  {Object.keys(data.Obj.fields).map((el, i) => {
                let subtitle = true;
                let type = 'text';
                let dateHeader = '';
                  if (i === 0) {
                      subtitle = false;
                  }
                  if (el === 'date1' || el === 'date2') {
                    type = 'date';
                    dateHeader = <div key={`div_${el}_date`}><h6 key={`h6_${el}_date`} className="text-muted form-control-sm">{data.Obj.fields[el]}</h6></div>;
                  }
                      return (<div key={`${el}`}>{dateHeader}<CardTitle
                        className="card-title"
                        key={el}
                        type={type}
                        subtitle={subtitle}
                        placeholder={data.Obj.fields[el]}
                        name={el}
                        value={this.state[el]}
                        onChange={this.handleChangeForm}
                      /></div>);
              })}
                </div>
                <div className="card-body">
                  <a href="#" className="card-link text-success" onClick={this.saveObject}><span className="oi oi-check" /> Add</a>
                </div>
              </div>);
        }

        return (
          <div >{inputForm}</div>
        );
    }
}


export default CardInput;
