import React, { Component } from 'react';

class Result extends Component {
    render() {
        return (

            <div className="Result">
                <img src={this.props.image} alt={this.props.title} />
                <h3>{this.props.title} ({this.props.year})</h3>
            </div>
        )
    }
}

export default Result;