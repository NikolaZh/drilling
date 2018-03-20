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
        return (
          <div className="card" >
            <div className="card-body card-content-small">
              {Object.keys(this.state.Obj.fields).map((el, i) => {
                if (i === 0) {
                   return <h5 className="card-title" key={el}>{this.state.Obj.fields[el]}</h5>;
                }
                  return <h6 className="card-subtitle mb-2 text-muted" key={el}>{this.state.Obj.fields[el]}</h6>;
              })}
              <p className="card-text">Used in &laquo;<a href="#">#Project</a>&raquo; (till 25.01.2018)</p>
            </div>
            <div className="card-body" >
              <a href="#" className="card-link text-info" ><span className="oi oi-pencil" /> Edit</a>
              <a href="#" className="card-link text-danger" ><span className="oi oi-trash" /> Drop</a>
            </div>
          </div>
        );
    }
}


export default Card;
