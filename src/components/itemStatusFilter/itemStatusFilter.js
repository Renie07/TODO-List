import React, {Component} from 'react';

import './itemStatusFilter.css';


class ItemStatusFilter extends Component {
    constructor() {
        super();

        this.buttons = [
            {name: 'all', label: 'All'},
            {name: 'done', label: 'Done'},
            {name: 'active', label: 'Active'}
        ]

    }

    render() {
        const { filter, onFilterChange } = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const btnClass = isActive ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button type="button" key={name} className={`btn ${btnClass}`} onClick={() => onFilterChange(name)}>{label}</button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }

}

export default ItemStatusFilter;