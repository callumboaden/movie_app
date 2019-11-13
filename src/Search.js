import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = { query: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSearch(this.state);
    }
    
    handleChange(e) {
        this.setState({ query: e.target.value })
    }

    render() {
        return (   
            <form className="Search" onSubmit={this.handleSubmit}>
                <input name="query" type="text" className="Search__input" onChange={this.handleChange} />
                <button className="Search__button">Submit</button>
            </form>
        )
    }
}

export default Search;