window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider'),
        cards = require('./modules/cards');

    tabs();
    modal();
    calc();
    forms();
    timer();
    slider();
    cards();
});
