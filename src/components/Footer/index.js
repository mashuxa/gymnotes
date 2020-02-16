import React from 'react';
import './style.scss';

import { ReactComponent as IconLetter } from './assets/letter.svg'

export default function() {
    return (
        <footer className="footer">
            <div className="footer__copyright">© 2020 GymNotes</div>
            <a href="mailto:9364688@gmail.com" className="footer__contacts">
                <IconLetter className="footer__icon footer__icon--letter" />
                <span>Contact us</span>
            </a>
        </footer>
    );
}
