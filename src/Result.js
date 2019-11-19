import React, { Component } from 'react';

import './Result.css';

class Result extends Component {
    static defaultProps = {
        basePageUrl: `/movie/`,
        baseImgUrl: 'https://image.tmdb.org/t/p/w185/'
    }
    render() {
        let image = `${this.props.baseImgUrl}${this.props.image}`;
        let year = this.props.year.split('').splice(0, 4);
        let pageUrl = `${this.props.basePageUrl}#${this.props.id}`;
        return (
            <div className="Result">
                <div className="Result__image">
                    <a href={pageUrl}><img src={image} alt={this.props.title} /></a>
                </div>
                <div className="Result__text">
                    <h3>{this.props.title} ({year})</h3>
                    <p>{this.props.overview}</p>
                </div>
                

            </div>
        )
    }
}

export default Result;