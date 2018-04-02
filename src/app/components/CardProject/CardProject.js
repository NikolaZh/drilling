import React, { Component } from 'react';
import CardEditProject from '../CardEditProject/CardEditProject';
import OwnSection from '../OwnSection/OwnSection';
import { storage, Driller, Operator, Equipment, Project, scheduler } from '../../js/js-library';

class CardProject extends Component {
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
        const projectFields = this.state.Obj.fields;
        const project = this.state.Obj;
        const ownsDriller = scheduler.getOwnsItems(project, Driller);
        const ownsEquipment = scheduler.getOwnsItems(project, Equipment);
        const ownsOperator = scheduler.getOwnsItems(project, Operator);
        let card = (
          <div className="card">
            <div className="card-body card-content-small">
              <h5 className="card-title">{projectFields.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{projectFields.address}, {projectFields.phone}, {projectFields.fio}</h6>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th>Date start</th>
                    <td>{(new Date(projectFields.date1)).toLocaleString('ru', options)}</td>
                    <td />
                  </tr>
                  <tr>
                    <th>Date end</th>
                    <td>{(new Date(projectFields.date2)).toLocaleString('ru', options)}</td>
                    <td />
                  </tr>
                  <OwnSection name="Drillers" project={project} owns={ownsDriller} alldata={Array.from(storage.all(Driller))} changeData={this.props.changeData} />
                  <OwnSection name="Equipment" project={project} owns={ownsEquipment} alldata={Array.from(storage.all(Equipment))} changeData={this.props.changeData} />
                  <OwnSection name="Operators" project={project} owns={ownsOperator} alldata={Array.from(storage.all(Operator))} changeData={this.props.changeData} />
                </tbody>
              </table>
            </div>
            <div className="card-body">
              <a href="#" className="card-link text-info" onClick={this.changeMount}><span className="oi oi-pencil" /> Edit</a>
              <a href="#" className="card-link text-danger" onClick={this.dropCard}><span className="oi oi-trash" /> Drop</a>
            </div>
          </div>
        );
        if (!this.state.cardInputMount) {
            card = (
              <CardEditProject
                Obj={project}
                changeData={this.props.changeData}
                alldataOwns={ownsDriller.concat(ownsEquipment, ownsOperator)}
                ownsEquipment={ownsEquipment}
                ownsOperator={ownsOperator}
                alldataDriller={Array.from(storage.all(Driller))}
                alldataEquipment={Array.from(storage.all(Equipment))}
                alldataOperator={Array.from(storage.all(Operator))}
              />
            );
        }
        return (
          <div> {card} </div>
        );
    }
}


export default CardProject;
