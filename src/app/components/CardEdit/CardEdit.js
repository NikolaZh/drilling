import React, { Component } from 'react';
import CardTitle from '../CardInput/CardTitle/CardTitle';
import { storage } from '../../js/js-library';

class CardEdit extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {

        };
        this.state = this.stateFromProps(props.Obj.fields);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.saveObject = this.saveObject.bind(this);
    }

    stateFromProps(props) {
        const state = Object.keys(props).reduce((obj, cur) => {
            obj[cur] = props[cur];
            return obj;
        }, {});
        return state;
    }

    handleChangeForm(e) {
        const property = e.target.name;
        const val = e.target.value;
        this.setState({
            [property]: val,
        });
    }

    saveObject() {
        const EditedObject = this.props.Obj;
        for (const key in this.state) {
            EditedObject.fields[key] = this.state[key];
        }
        storage.save(EditedObject);
        this.props.changeData(this.props.Obj.constructor.name, true);
    }

    render() {
        const data = this.props;
        return (
          <div className="card">
            <div className="card-body card-content-small">
              {Object.keys(data.Obj.fields).map((el, i) => {
                let subtitle = true;
                const type = 'text';
                const dateHeader = '';
                  if (i === 0) {
                      subtitle = false;
                  }
                      return (<div key={`${el}`}>{dateHeader}<CardTitle
                        className="card-title"
                        key={el}
                        type={type}
                        subtitle={subtitle}
                        name={el}
                        value={this.state[el]}
                        onChange={this.handleChangeForm}
                      /></div>);
              })}
            </div>
            <div className="card-body">
              <a href="#" className="card-link text-success" onClick={this.saveObject}><span className="oi oi-check" /> Save Changes</a>
            </div>
          </div>
        );
    }
}

export default CardEdit;
