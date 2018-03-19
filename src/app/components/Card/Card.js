import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            Obj: props.Obj,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            Obj: nextProps.Obj,
        });
    }

    render() {
        console.log(this.state.Obj.fields);
        return (
          <div className="card" >
            <div className="card-body card-content-small">
              {Object.keys(this.state.Obj.fields).map((el, i) => {
                if (el === 'owns') return <h6 className="card-subtitle mb-2 text-muted" key={el}> заняты на проекте </h6>;
                if (i === 0) {
                   return <h5 className="card-title" key={el}>{this.state.Obj.fields[el].toString()}</h5>;
                }
                  return <h6 className="card-subtitle mb-2 text-muted" key={el}>{this.state.Obj.fields[el].toString()}</h6>;
              })}
              <p className="card-text">Used in &laquo;<a href="#">#Project</a>&raquo; (till 25.01.2018)</p>
            </div>
            <div className="card-body" key={this.props.key}>
              <a href="#" className="card-link text-info" key={this.props.key}><span className="oi oi-pencil" key={this.props.key} /> Edit</a>
              <a href="#" className="card-link text-danger" key={this.props.key}><span className="oi oi-trash" key={this.props.key} /> Drop</a>
            </div>
          </div>
        );
    }
}


export default Card;
