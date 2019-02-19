import React from 'react';
import {FilterDate} from "../../components/FilterDate";
import {FilterCategory} from '../../components/FilterCategory'
import {FilterContractor} from '../../components/FilterContractor'

function Home() {
    return (
        <React.Fragment>
            <FilterDate/>
            <FilterCategory/>
            <FilterContractor/>
        </React.Fragment>
    );
}


export {Home};
