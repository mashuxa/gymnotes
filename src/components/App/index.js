import React from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';
import './normalize.scss';
import './grid.scss';
import './utilities.scss';

export default function ({children}) {
    return (
        <React.Fragment>
            <Header/>
            <div className="page-wrapper">
                <main className="main">
                    {children}
                </main>
            </div>
            <Navigation/>
            <Footer/>
        </React.Fragment>
    );
}
