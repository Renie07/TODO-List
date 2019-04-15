import React, {Component} from 'react';

import './searchPanel.css';

class SearchPanel extends Component {
    constructor() {
        super();

        this.state = {
            term: ''
        }

        this.searchItems = (event) => {
            this.setState({
                term: event.target.value
            })
            this.props.onSearch(this.state.term);
        }
    }
    render() {
        return (
            <input type="text"
                   onChange={this.searchItems}
                   value={this.state.term}
                   className="form-control search-input"
                   placeholder="type to search" />
        );
    }
};

export default SearchPanel;