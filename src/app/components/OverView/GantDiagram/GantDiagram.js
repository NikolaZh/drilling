import React, { Component } from 'react';
import ProjectBar from './ProjectBar/ProjectBar';
import LineBar from './LineBar/LineBar';
import OwnBar from './OwnBar/OwnBar';

class GantDiagram extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { project, ownData } = this.props;
        const options = {
            day: 'numeric',
            year: 'numeric',
            month: 'numeric',
        };
        const dateNow = new Date();
        const dateStart = new Date(project.fields.date1);
        const dateEnd = new Date(project.fields.date2);
        const daysInPercent = (dateEnd - dateStart) / 100;
        const marginLeftLineBar = (dateNow - dateStart) / daysInPercent;
        let heightLineBar = 75;
        const ownBars = [];
        for (const element of ownData) {
            const marginLeft = ((new Date(element.dateStart) - dateStart) / daysInPercent).toFixed(1);
            const width = ((new Date(element.dateEnd) - new Date(element.dateStart)) / daysInPercent).toFixed(1);
            ownBars.push(<OwnBar name={element.item.name} marginLeft={marginLeft} width={width} key={heightLineBar} />);
            heightLineBar += 50;
        }
        const dateNowString = dateNow.toLocaleString('ru', options);
        const dateStartString = dateStart.toLocaleString('ru', options);
        const dateEndString = dateEnd.toLocaleString('ru', options);
        return (
          <div>
            <ProjectBar name={project.fields.name} dateStart={dateStartString} dateEnd={dateEndString} />
            {ownBars}
            <LineBar dateNow={dateNowString} height={heightLineBar} marginLeft={marginLeftLineBar} />
          </div>

        );
    }
}

export default GantDiagram;
