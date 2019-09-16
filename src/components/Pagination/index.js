import './style.scss';
import React from 'react';


function Pagination(props) {
    return (
        <React.Fragment>
            {!props.count ? false : <div className="d-flex j-between">
                <div>
                    {props.page === 1 ? false : (<button onClick={props.onClickPrevPage}>Prev</button>)}
                </div>
                <span>page {props.page} / {Math.ceil(props.count / props.perPage)}</span>
                <div>
                    {(props.page * props.page >= props.count) ? false : (
                        <button onClick={props.onClickNextPage}>Next</button>)}
                </div>
            </div>}
        </React.Fragment>
    );
}

export {Pagination};
