import React, { Component } from 'react';
import { API_KEY } from './config';
import axios from 'axios';

import './Movie.css';

class Movie extends Component {
    static defaultProps = {
        baseImgUrl: 'https://image.tmdb.org/t/p/original/',
        baseUrl: 'https://api.themoviedb.org/3/movie/'
    }

    constructor(props) {
        super(props);
        this.state = { data: {}, images: [] }
    }
    
    async componentDidMount() {
        // Get ID from url
        const url = this.props.baseUrl;
        const id = window.location.hash.replace('#', '');

        try {
            const res = await axios.get(`${url}${id}?api_key=${API_KEY}`);
            const imageRes = await axios.get(`${url}${id}/images?api_key=${API_KEY}`);
            const creditRes = await axios.get(`${url}${id}/credits?api_key=${API_KEY}`);
            
            const images = imageRes.data.backdrops;
            const credits = creditRes.data;
            
            this.setState({ 
                data: res.data, 
                images: images, 
                credits: credits 
            });


        } catch (err) {
            console.log(err);
        }

        console.log(this.state.data);
    }
    render() {
        let {
            title, 
            overview, 
            backdrop_path, 
            runtime, 
            release_date, 
            genres, 
            imdb_id 
        } = this.state.data;
        let imgSrc = `${this.props.baseImgUrl}${backdrop_path}`;
        let images = this.state.images.map(img => (
            <img src={`${this.props.baseImgUrl}${img.file_path}`} />
        ));

        return (
            <div className="Movie">
                <img src={imgSrc} alt={title} />
                <h1>{title}</h1>
                <p>{overview}</p>

                <div className="Movie__details">
                    <p>Runtime: {runtime} min</p>
                    <p>Released: {release_date}</p>             
                </div>
                <div className="Movie__images">
                    {images}
                </div>
            </div>
        )
    }
}


export default Movie;