import React, { Component } from 'react';

class CardTitle extends Component {
    constructor(props) {
        super();
        this.props = props;
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // handlePasswordChange(e) {
    //     this.setState({
    //         state: {
    //             NewEmptyObj: {
    //                 value: e.target.value,
    //             },
    //         },
    //     });
    // this.props.state = e.target.value;
    // }

    render() {
        const data = this.props;
        let titleClass = 'card-title';
        if (data.subtitle) {
            titleClass = 'card-subtitle mb-2 text-muted';
        }

        return (
          <h5 className={titleClass} >
            <input
              name={data.name}
              type={data.type}
              placeholder={data.placeholder}
              value={data.value}
              className="form-control form-control-sm"
              onChange={data.onChange}
            />
          </h5>
        );
    }
}

export default CardTitle;
