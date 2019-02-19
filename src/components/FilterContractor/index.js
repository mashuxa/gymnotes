import './style.scss';
import './app';
import React from 'react';
import {SearchFilter} from '../SearchFilter';
import {ContractorCard} from '../ContractorCard';

function FilterContractor() {
    return (
        <section className="filter-contractor">
            <SearchFilter/>
            <div className="filter-contractor__wrapper">
                <ContractorCard/>
                <ContractorCard/>
                <ContractorCard/>
                <ContractorCard/>
            </div>
        </section>
    );
}

export {FilterContractor};