import React from 'react';
import './style.scss';
import {ContractorCard} from "../ContractorCard";

function Listing(props) {
    const isDisabledPrevBtn = props.page === 1;
    const lastPage = Math.ceil(props.count / props.perPage);
    const isDisabledNextBtn = props.page * props.perPage >= props.count;
    const items = props.items.map((user, i) => <ContractorCard key={i} data={user}/>);
    const btnBaseClass = `listing__pagination-btn`;

    return (
        props.items.length ? <div className="listing">
            <div className="listing__pagination">
                <button className={`${btnBaseClass} ${btnBaseClass}--prev ${isDisabledPrevBtn && `${btnBaseClass}--disabled`}`}
                        onClick={props.onClickPrevPage} disabled={isDisabledPrevBtn} />
                <span className="listing__count">page {props.page} / {lastPage}</span>
                <button className={`${btnBaseClass} ${btnBaseClass}--next ${isDisabledNextBtn && `${btnBaseClass}--disabled`}`}
                         onClick={props.onClickNextPage} disabled={isDisabledNextBtn}/>
            </div>
            {items}
        </div> : <div className='listing__msg'>No items</div>
    );
}

export {Listing};
