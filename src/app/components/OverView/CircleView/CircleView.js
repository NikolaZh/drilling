import React, { Component } from 'react';

class CircleView extends Component {
    constructor(props) {
        super();
    }

    render() {
        const data = this.props;
        const {
            label, date1, date2,
        } = data;
        const dateNow = new Date();
        const onePercent = (date2 - date1) / 100;
        const daysGone = (dateNow - date1);
        let progressValue = Math.round(daysGone / onePercent);
        if (progressValue < 0) {
            progressValue = 0;
        }

        let colorImg = 'data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=';
        let colorBar = 'progress-bar';
        if (data.color === 'green') {
            colorImg = 'data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs=';
            colorBar = 'progress-bar bg-success';
        }
        return (
          <div className="col-6 col-sm-3 placeholder">
            <a href="#">
              <img src={colorImg} width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
              <h4>{label}</h4>
              <div className="progress">
                <div className={colorBar} role="progressbar" style={{ width: `${progressValue}%` }} aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100">{progressValue}%</div>
              </div>
            </a>
          </div>
        );
    }
}

export default CircleView;
