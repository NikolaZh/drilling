import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
          <div className="card">
            <div className="card-body card-content-small">
              <h5 className="card-title">Scania ZZ-01, 2005</h5>
              <h6 className="card-subtitle mb-2 text-muted">S-ZZ-01</h6>
              <p className="card-text">Used in &laquo;<a href="#">Морской фасад</a>&raquo; (till 25.01.2018)</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link text-info"><span className="oi oi-pencil" /> Edit</a>
              <a href="#" className="card-link text-danger"><span className="oi oi-trash" /> Drop</a>
            </div>
          </div>
        );
    }
}


export default Card;
