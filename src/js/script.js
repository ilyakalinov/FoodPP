require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import forms from './modules/forms';
import timer from './modules/timer';
import slider from './modules/slider';
import cards from './modules/cards';
import{openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    timer('.timer', '2021-12-23 12:00');
    calc();
    slider({
        slide: '.offer__slider',
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentContainer: '#current',
        totalContainer: '#total',
        Wrapper: '.offer__slider-wrapper',
        Area: '.offer__slider-inner'
    });
    cards();
});
