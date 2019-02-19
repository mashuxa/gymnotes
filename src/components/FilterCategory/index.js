import './style.scss';
import './app';
import React from 'react';
import {SearchFilter} from '../SearchFilter';
import {CategoryTag} from '../CategoryTag';

function FilterCategory() {
    return (
        <section className="filter-category">
            <SearchFilter/>
            <section className="filter-category__results-wrapper">
                <CategoryTag/>
                <CategoryTag/>
                <CategoryTag/>
            </section>
        </section>
    );
}

export {FilterCategory};