import './normalize.scss';
import './grid.scss';
import './utilities.scss';

import React from 'react';
import {Header} from '../Header';
import {Navigation} from '../Navigation';
import {Footer} from '../Footer';


function App({children}) {
    return (
        <React.Fragment>
            <Header/>
            <Navigation/>
            <div className="page-wrapper">
                {/*<aside className="sidebar"></aside>*/}
                <main className="main">
                    {children}
                </main>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export {App};
