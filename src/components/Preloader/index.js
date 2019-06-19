import './style.scss';
import React from 'react';

function Preloader() {
    return (
        <div className="preloader">
            <span className="preloader__dot preloader__dot--1"></span>
            <span className="preloader__dot preloader__dot--2"></span>
            <span className="preloader__dot preloader__dot--3"></span>
        </div>
    );
}

export {Preloader};
