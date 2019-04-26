import React from 'react';
import { connect } from 'react-redux';

const Filters = ({ onSelectFilter }) => {
    return (
        <div className="col-sm-9 filters-container">
            <p>filters</p>
            <button onClick={() => onSelectFilter('bringers')}>Bringers</button>
            <button onClick={() => onSelectFilter('non-bringers')}>Non-bringers</button>
            <button onClick={() => onSelectFilter('Mon')}>Mon</button>
            <button onClick={() => onSelectFilter('Tue')}>Tue</button>
            <button onClick={() => onSelectFilter('all')}>Show All</button>
        </div>
    )
}

export default connect(null, null)(Filters);