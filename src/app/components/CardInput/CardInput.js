import React, { Component } from 'react';
import CardTitle from './CardTitle/CardTitle';
import { storage } from '../../js/js-library';

class CardInput extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = this.stateFromProps(props.Obj.fields);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.saveObject = this.saveObject.bind(this);
        this.resetState = this.resetState.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        for (const key of Object.keys(this.state)) { // maybe not necessary
            this.state[key] = undefined;
        }
        const state = this.stateFromProps(nextProps.Obj.fields);
        this.setState(state);
    }


    stateFromProps(props) {
        const state = Object.keys(props).reduce((obj, cur) => {
            obj[cur] = '';
            return obj;
        }, {});
        return state;
    }


    resetState() {
        this.setState(this.stateFromProps(this.props.Obj.fields));
    }


    handleChangeForm(e) {
        const property = e.target.name;
        const val = e.target.value;

        this.setState({
            [property]: val,
        });
    }


    saveObject() {
        const data = this.props;
        const NewObject = data.NewEmptyObject;


        console.log(NewObject);
        console.log(this.state);
        Object.assign(NewObject.fields, this.state);
        console.log(NewObject);
        // storage.save();
        // this.state = {};


        console.log(this.state);
    }


    render() {
        const data = this.props;
        const NewObject = data.NewEmptyObject;

        return (
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
                      return (<div key={`${el}`}><CardTitle
                        className="card-title"
                        key={el}
                        type={type}
                        subtitle={subtitle}
                        placeholder={data.Obj.fields[el]}
                        name={el}
                        value={this.state[el]}
                        onChange={this.handleChangeForm}
                      />{dateHeader}</div>);
              })}
            </div>

            <div className="card-body">
              <a href="#" className="card-link text-success" onClick={this.saveObject}><span className="oi oi-check" /> Add</a>
              <button onClick={this.resetState} >Clear state</button>
            </div>


          </div>
        );
    }
}


export default CardInput;
