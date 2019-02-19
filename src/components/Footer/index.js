import './style.scss';
import React from 'react';

import { ReactComponent as IconLetter } from './assets/letter.svg'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__copyright">© 2019 findUp</div>
            <a href="mailto:9364688@gmail.com" className="footer__contacts">
                <IconLetter className="footer__icon footer__icon--letter" />
                <span>Contact us</span>
            </a>
        </footer>
    );
}

export {Footer};
