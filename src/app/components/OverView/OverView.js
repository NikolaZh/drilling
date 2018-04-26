import React, { Component } from 'react';
import { Project, storage, scheduler } from '../../js/js-library';
import CircleView from './CircleView/CircleView';
import GantDiagram from './GantDiagram/GantDiagram';

class OverView extends Component {
    constructor(props) {
        super();
    }

    render() {
        const allProjects = Array.from(storage.all(Project));
        let gantDiagram;
        const circleSection = [];
        if (allProjects.length === 0) {
            circleSection.push(<div className="col" key="no-project">No Projects yet!</div>);
        } else {
            gantDiagram = <GantDiagram project={allProjects[0]} ownData={scheduler.getAllOwns(allProjects[0])} />;
            allProjects.forEach((item, index) => {
                if (index % 2 === 0) {
                    circleSection.push(<CircleView label={item.fields.name} key={`${item.fields.name + index}`} color="green" date1={item.fields.date1} date2={item.fields.date2} />);
                } else {
                    circleSection.push(<CircleView label={item.fields.name} key={`${item.fields.name + index}`} date1={item.fields.date1} date2={item.fields.date2} />);
                }
            });
        }
        return (
          <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
            <h1>Overview</h1>
            <section className="row text-center placeholders">
              {circleSection}   {/* TO DO carousel */}
            </section>
            {gantDiagram}
          </main>
        );
    }
}

export default OverView;
