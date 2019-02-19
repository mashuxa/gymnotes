import './style.scss';
import React from 'react';
import {ReactComponent as IconArrowLeft} from './assets/arrow-left.svg';
import {ReactComponent as IconArrowRight} from './assets/arrow-right.svg';

class Calendar extends React.Component {
    render() {
        return (
            <table className="calendar">
                <thead className="calendar__thead">
                <tr>
                    <th className="calendar__header" colSpan="7">
                        <div className="calendar__header-wrapper">
                            <IconArrowLeft className='calendar__btn calendar__btn--left' />
                            <span className="calendar__month">January</span>
                            <IconArrowRight className='calendar__btn calendar__btn--right' />
                        </div>
                    </th>
                </tr>
                <tr>
                    <th className="calendar__th">mon</th>
                    <th className="calendar__th">tue</th>
                    <th className="calendar__th">wed</th>
                    <th className="calendar__th">thu</th>
                    <th className="calendar__th">fri</th>
                    <th className="calendar__th">sat</th>
                    <th className="calendar__th">sun</th>
                </tr>
                </thead>
                <tbody className="calendar__tbody">
                <tr>
                    <td className="calendar__td">1</td>
                    <td className="calendar__td calendar__td--enable">2</td>
                    <td className="calendar__td">3</td>
                    <td className="calendar__td calendar__td--enable">4</td>
                    <td className="calendar__td">5</td>
                    <td className="calendar__td calendar__td--enable">6</td>
                    <td className="calendar__td">7</td>
                </tr>
                <tr>
                    <td className="calendar__td calendar__td--enable">8</td>
                    <td className="calendar__td">9</td>
                    <td className="calendar__td calendar__td--enable">10</td>
                    <td className="calendar__td">11</td>
                    <td className="calendar__td">12</td>
                    <td className="calendar__td calendar__td--enable">13</td>
                    <td className="calendar__td calendar__td--enable calendar__td--active">14</td>
                </tr>
                <tr>
                    <td className="calendar__td">15</td>
                    <td className="calendar__td calendar__td--enable">16</td>
                    <td className="calendar__td">17</td>
                    <td className="calendar__td">18</td>
                    <td className="calendar__td calendar__td--enable">19</td>
                    <td className="calendar__td">20</td>
                    <td className="calendar__td">21</td>
                </tr>
                <tr>
                    <td className="calendar__td">22</td>
                    <td className="calendar__td calendar__td--enable">23</td>
                    <td className="calendar__td calendar__td--enable">24</td>
                    <td className="calendar__td calendar__td--enable">25</td>
                    <td className="calendar__td">26</td>
                    <td className="calendar__td">27</td>
                    <td className="calendar__td">28</td>
                </tr>
                <tr>
                    <td className="calendar__td">29</td>
                    <td className="calendar__td">30</td>
                    <td className="calendar__td">31</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export {Calendar};