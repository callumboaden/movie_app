import React, { Component } from 'react';
import Result from './Result';
import Search from './Search';
import {API_KEY } from './config';
import axios from 'axios';

import './MovieResults.css';

class MovieResults extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] }
        
        this.goToPage = this.goToPage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    async handleSearch(query) {

        console.log(query);

        if (query) {

            this.query = query.query;

            try {
            
                const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.query}&page=1`);
        
                this.setState({ 
                    results: res.data.results,
                    page: res.data.page,
                    totalPages: res.data.total_pages,
                    totalResults: res.data.total_results
                });
    
            } catch (err) {
                console.log(err);
            }

        }

        console.log(this.state.results);
        

    }


    // Handle pagination

    async goToPage(e) {        
        let page = this.state.page
        const action = e.target.dataset.page;

        if (action === 'prev' && this.state.page > 1) {
           page -= 1;
        }

        if (action === 'next' && this.state.page < this.state.totalPages) {
            page += 1;
        }

        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.query}&page=${page}`)  
            
            this.setState({ 
                results: res.data.results,
                page: res.data.page,
                totalPages: res.data.total_pages,
                totalResults: res.data.total_results
            });

            
        } catch (err) {
            console.log(err);
        }
        
        
        
    }

    render() {
        const results = this.state.results.map(r => (
            <Result 
                key={r.id}
                id={r.id}
                title={r.title}
                image={r.poster_path}
                overview={r.overview}
                year={r.release_date}
            />
        ));
        return (
            <div className="MovieResults__container">
                <a href={`https://www.themoviedb.org/authenticate/${this.state.token}`}>LOGIN</a>
                <Search handleSearch={this.handleSearch} />

                <h1> 
                    { 
                        !this.state.results.length < 1 ? 
                        `${this.state.totalResults} Results for: "${this.query}"` : ''
                    } 
                </h1>

                <div className="MovieResults__list">
                    { results }
                </div>

                <div className="MovieResults__pages">

                    <p>
                        Page: {this.state.page} of {this.state.totalPages}
                    </p>

                    <button 
                    onClick={this.goToPage} data-page="prev">Previous</button>
                    
                    <button 
                    onClick={this.goToPage}
                    data-page="next">Next</button>
                    
                </div>

            </div>
        )
    }
}

export default MovieResults;