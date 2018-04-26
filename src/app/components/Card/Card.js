import React, { Component } from 'react';
import CardEdit from '../CardEdit/CardEdit';
import { scheduler } from '../../js/js-library';

class Card extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            Obj: props.Obj,
        };
        this.state.cardInputMount = true;
        this.changeMount = this.changeMount.bind(this);
        this.dropCard = this.dropCard.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            Obj: nextProps.Obj,
        });
        this.setState({
            cardInputMount: true,
        });
    }

    changeMount() {
        this.setState({
            cardInputMount: !this.state.cardInputMount,
        });
    }

    dropCard() {
        scheduler.deleteObject(this.state.Obj);
        this.props.changeData(this.state.Obj.constructor.name, true);
    }

    render() {
        const options = {
            day: 'numeric',
            year: 'numeric',
            month: 'numeric',
        };
        let usedInProjects = (
          <p className="card-text">No used in Projects</p>
        );
        const objectOwnAtProjects = scheduler.getProjectsWhereItemOwn(this.state.Obj);
        if (objectOwnAtProjects) {
            usedInProjects = [];
            for (const item of objectOwnAtProjects) {
                let counter = 0;
                item.getBinded(this.state.Obj).forEach((el) => {
                    if (el.id === this.state.Obj.id) {
                        const projName = `Project ${item.fields.name}`;
                        const dateEnd = (new Date(el.dateEnd)).toLocaleString('ru', options);
                        usedInProjects.push(<p className="card-text" key={item.fields.name + counter}>Used in &laquo;<a href="#">{projName}</a>&raquo; (till {dateEnd})</p>);
                        counter++;
                    }
                });
            }
        }
        let card = (
          <div className="card" >
            <div className="card-body card-content-small">
              {Object.keys(this.state.Obj.fields).map((el, i) => {
                if (i === 0) {
                   return <h5 className="card-title" key={el}>{this.state.Obj.fields[el]}</h5>;
                }
                  return <h6 className="card-subtitle mb-2 text-muted" key={el}>{this.state.Obj.fields[el]}</h6>;
              })}
              {usedInProjects}
            </div>
            <div className="card-body" >
              <a href="#" className="card-link text-info" onClick={this.changeMount}><span className="oi oi-pencil" /> Edit</a>
              <a href="#" className="card-link text-danger" onClick={this.dropCard}><span className="oi oi-trash" /> Drop</a>
            </div>
          </div>
        );
        if (!this.state.cardInputMount) {
            card = (
              <CardEdit Obj={this.state.Obj} changeData={this.props.changeData} />
            );
        }

        return (
          <div> { card } </div>
        );
    }
}


export default Card;
