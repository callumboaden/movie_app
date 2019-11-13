import React, { Component } from 'react';
import Result from './Result';
import Search from './Search';
import {proxy, key} from './config';
import axios from 'axios';

import './MovieResults.css';

class MovieResults extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] }

        this.handleSearch = this.handleSearch.bind(this);
    }

    async handleSearch(query) {
        
        try {
            const res = await axios.get(`${proxy}http://www.omdbapi.com/?apikey=${key}&s=${query.query}`);

            this.setState({ results: res.data.Search })

        } catch (err) {

            console.log(err);

        }

    }

    render() {
        const results = this.state.results.map(r => (
            <Result 
                key={r.imdbID} 
                id={r.imdbID}
                title={r.Title}
                year={r.Year}
                image={r.Poster}
            />
        ))
        return (
            

            <div className="MovieResults__container">

                <Search handleSearch={this.handleSearch} />

                <h1>Results</h1>

                <div className="MovieResults__list">
                    { results }
                </div>

            </div>
        )
    }
}

export default MovieResults;