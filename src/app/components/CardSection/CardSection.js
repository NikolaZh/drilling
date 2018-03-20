import React, { Component } from 'react';
import Card from '../Card/Card';
import CardProject from '../CardProject/CardProject';
import CardInput from '../CardInput/CardInput';

class CardSection extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            Obj: props.Obj,
            NewEmptyObject: props.NewEmptyObject,
            changeData: props.changeData,
            storageData: props.storageData,
            allDataChange: props.allDataChange,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            Obj: nextProps.Obj,
            NewEmptyObject: nextProps.NewEmptyObject,
            changeData: nextProps.changeData,
            storageData: nextProps.storageData,
            allDataChange: nextProps.allDataChange,
        });
    }

    dataByThreeOnLine(array) {
        const result = [];
        let bufferArr = [];
        let counter = 0;
        let key = 1;
        for (let i = 0; i < array.length; i++) {
            bufferArr.push(array[i]);
            counter++;
            if (counter === 3) {
                result.push(<section className="row card-section" key={`card-section${key}`}>
                  {bufferArr}
                </section>);
                bufferArr = [];
                counter = 0;
                key++;
            }
        }
        if (counter === 0) return result;
        result.push(<section className="row card-section" key={`card-section${key}`}>
          {bufferArr}
        </section>);
        return result;
    }

    render() {
        const data = this.props;
        const cardArray = [];
        cardArray[0] = (
          <div className="col-sm-4" key="card-input">
            <CardInput
              Obj={this.state.Obj}
              NewEmptyObject={this.state.NewEmptyObject}
              changeData={this.state.changeData}
              allDataChange={this.state.allDataChange}
            />
          </div>
        );
        let counter = 1;
        if (this.state.NewEmptyObject.constructor.name !== 'Project') {
            for (const item of this.state.storageData) {
                cardArray.push(<div className="col-sm-4" key={`card-div${counter}`}>
                  <Card Obj={item} />
                </div>);
                counter++;
            }
        } else {
            for (const item of this.state.storageData) {
                cardArray.push(<div className="col-sm-4" key={`card-div${counter}`}>
                  <CardProject Obj={item} />
                </div>);
                counter++;
            }
        }

        const Cards = this.dataByThreeOnLine(cardArray);
        return (
          <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3" >
            {Cards}
          </main>

        );
    }
}


export default CardSection;
