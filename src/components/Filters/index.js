import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import * as actions from './constants';
import './styles.scss';
import { analyticsEvent } from '../../lib/utils';

const Filters = ({ updateStateFiltersChanged, filters }) => {

    const [ firstRow, setFirstRow ] = useState([]);
    const [ secondRow, setSecondRow ] = useState([]);
    const [ thirdRow, setThirdRow ] = useState([]);

    useEffect(() => {
        setFirstRow(filters.slice(0, 4))
        setSecondRow(filters.slice(4, 7))
        setThirdRow(filters.slice(7, 10))
    }, [filters])

    // console.log('firstRow: ', firstRow);

    const handleFilterClick = filter => {
        let existingFilters = filters;
        let filterToChange = existingFilters.filter(each => each.id === filter.id)[0];
        const updatedOneFilter = {
            ...filterToChange,
            active: !filterToChange.active,
        }
        let allOtherFilters = existingFilters.filter(each => each.id !== filter.id);
        
        allOtherFilters.push(updatedOneFilter);

        const sortedFilters = allOtherFilters.sort((a, b) => {
            var textA = a.id;
            var textB = b.id;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        updateStateFiltersChanged(sortedFilters);

    }
    
    return (
        <div className="col-sm-12 div__filters-outer-container">
            <p>filters</p>

            <div className="div__responsive-btns-container container">
                <div className="div__responsive-btns-row row">
                    { firstRow.map(((each, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Col className="center-column" sm={3}>
                                    <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => handleFilterClick(each)}>{each.filterName}</button>
                                </Col>
                            </React.Fragment>
                        )
                    })) }
                </div>
            </div>


            <div className="div__responsive-btns-container container">
                <div className="div__responsive-btns-row row">


            { secondRow.map(((each, i) => {
                return (
                    <React.Fragment key={i}>
                        <Col className="center-column" sm={3}>
                            <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => handleFilterClick(each)}>{each.filterName}</button>
                        </Col>
                    </React.Fragment>

                )
            })) }

                </div>
            </div>

            <div className="div__responsive-btns-container container">
                <div className="div__responsive-btns-row row">


            { thirdRow.map(((each, i) => {
                return (
                    <React.Fragment key={i}>
                        <Col className="center-column" sm={3}>
                            <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => handleFilterClick(each)}>{each.filterName}</button>                    
                        </Col>
                    </React.Fragment>

                )
            })) }

                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    filters: state.filters.filters,
})

const mapDispatchToProps = (dispatch) => ({
    updateStateFiltersChanged: (updatedFilters) => {
        dispatch({ type: actions.FILTERS_CHANGED, filters: updatedFilters });
        // analyticsEvent(`user-filtered-${selectedFilter.filterName}`);
        // dispatch({ type: actions.GET_CURRENT_FILTER_STATUSES, filters: allCurrentFilters })
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Filters);