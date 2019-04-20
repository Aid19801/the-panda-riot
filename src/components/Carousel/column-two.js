import React from 'react';
import './styles.scss';

const CarouselColumnTwo = ({ title, walkins, walkinSignUp, prebook, prebookSignUp, bringer, nearestTube }) => (
    <div className="col-container">
    <p>{title}</p>
        <table>
            <tr>
                <th>Walk-Ins</th>
                <th>Walk-Ins</th>
            </tr>
        </table>
    </div>
)

export default CarouselColumnTwo;