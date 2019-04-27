import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as actions from '../../containers/data-map-page/constants';
import './styles.scss';

const Filters = ({ userFiltered, filters }) => {

    const [ firstRow, setFirstRow ] = useState([]);
    const [ secondRow, setSecondRow ] = useState([]);
    const [ thirdRow, setThirdRow ] = useState([]);

    useEffect(() => {
        // console.log('filters: ', filters);
        setFirstRow(filters.slice(0, 3))
        setSecondRow(filters.slice(3, 7))
        setThirdRow(filters.slice(7, 10))
    }, [filters])

    return (
        <div className="col-sm-12 div__filters-outer-container">
            <p>filters</p>
            { firstRow.map(((each, i) => {
                return (
                    <React.Fragment key={i}>
                        <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => userFiltered(each)}>{each.filterName}</button>
                    </React.Fragment>

                )
            })) }
            { secondRow.map(((each, i) => {
                return (
                    <React.Fragment key={i}>
                        <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => userFiltered(each)}>{each.filterName}</button>
                    </React.Fragment>

                )
            })) }
            { thirdRow.map(((each, i) => {
                return (
                    <React.Fragment key={i}>
                        <button className={each.active ? 'btn__active' : 'btn__notactive'} onClick={() => userFiltered(each)}>{each.filterName}</button>
                    </React.Fragment>

                )
            })) }
        </div>
    )
}

const mapStateToProps = state => ({
    filters: state.dataMapPage.filters,
})

const mapDispatchToProps = (dispatch) => ({
    userFiltered: (chosenFilter) => dispatch({ type: actions.USER_CLICKED_FILTER, filter: chosenFilter })
})
export default connect(mapStateToProps, mapDispatchToProps)(Filters);