import './style.scss';
import React from 'react';
import { ReactComponent as IconFilter } from './assets/filter.svg';

function SearchFilter (){
    return (
        <section className="search-filter">
            <div className="search-filter__text-filter">
                <input className="search-filter__input-search" type="search" placeholder="Type text here for filter..."/>
                <IconFilter className='search-filter__icon'/>
            </div>

            {/*<div class="search-filter__view-switch">*/}
                {/*<input class="search-filter__input-radio" type="radio" name="searchFilterView"*/}
                       {/*id="SearchFilter-view-table"*/}
                       {/*checked>*/}
                    {/*<label class="search-filter__label" for="SearchFilter-view-table">*/}
                        {/*<svg class='search-filter__icon search-filter__icon&#45;&#45;table'>*/}
                            {/*<use xlink:href="#view-table"></use>*/}
                        {/*</svg>*/}
                    {/*</label>*/}
                    {/*<input class="search-filter__input-radio" type="radio" name="searchFilterView"*/}
                           {/*id="SearchFilter-view-list">*/}
                        {/*<label class="search-filter__label" for="SearchFilter-view-list">*/}
                            {/*<svg class='search-filter__icon search-filter__icon&#45;&#45;list'>*/}
                                {/*<use xlink:href="#view-list"></use>*/}
                            {/*</svg>*/}
                        {/*</label>*/}
            {/*</div>*/}

            {/*<div class="search-filter__order-filter">*/}
                {/*<select class="search-filter__order-select" name="" id="">*/}
                    {/*<option value="az">A-Z</option>*/}
                    {/*<option value="za">Z-A</option>*/}
                {/*</select>*/}
                {/*<svg class='search-filter__icon'>*/}
                    {/*<use xlink:href="#filter"></use>*/}
                {/*</svg>*/}
            {/*</div>*/}

        </section>
    );
}

export {SearchFilter};