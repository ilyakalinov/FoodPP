/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Заполните все данные';
            result.style.color = 'red';
            result.style.fontSize = '20px';
            return;
        }
        if (sex === 'female') {
            result.textContent = (Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        } else {
            result.textContent = (Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', `${+e.target.getAttribute('data-ratio')}`);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', `${e.target.getAttribute('id')}`);
            }

            console.log(ratio, sex);

            elements.forEach(item => {
                item.classList.remove(activeClass);
            });
            if (e.target.classList.contains('calculating__choose-item')) {
                e.target.classList.add(activeClass);
            }
            calcTotal();
        });

        function getFormSex(activeClass) {
            if (localStorage.getItem('sex') == 'male') {
                console.log(localStorage.getItem('sex'));
                document.querySelector('#male').classList.add(activeClass);
                sex = localStorage.getItem('sex');
            }
            if (localStorage.getItem('sex') == 'female') {
                document.querySelector('#female').classList.add(activeClass);
                sex = localStorage.getItem('sex');
            }
            if (localStorage.getItem('ratio') == "1.2") {
                document.querySelector('#small').classList.add(activeClass);
                ratio = localStorage.getItem('ratio');
            }
            if (localStorage.getItem('ratio') == "1.375") {
                document.querySelector('#medium').classList.add(activeClass);
                ratio = localStorage.getItem('ratio');
            }
            if (localStorage.getItem('ratio') == "1.55") {
                document.querySelector('#high').classList.add(activeClass);
                ratio = localStorage.getItem('ratio');
            }
            if (localStorage.getItem('ratio') == "1.725") {
                document.querySelector('#veryhigh').classList.add(activeClass);
                ratio = localStorage.getItem('ratio');
            }
        }
        getFormSex(activeClass);
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector, set) {
        const input = document.querySelector(selector);

        function getForm(set) {
            input.value = localStorage.getItem(set);
            if (set == 'height') {
                height = +localStorage.getItem(set);
            }
            if (set == 'weight') {
                weight = +localStorage.getItem(set);
            }
            if (set == 'age') {
                age = +localStorage.getItem(set);
            }
        }
        getForm(set);
        calcTotal();

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            
            if(input.getAttribute('id') == 'height') {
                height = +input.value;
                localStorage.setItem('height', height);
                calcTotal();
            }
            if (input.getAttribute('id') == 'weight'){
                weight = +input.value;
                localStorage.setItem('weight', weight);
                calcTotal();
            }
            if(input.getAttribute('id') == 'age'){
                age = +input.value;
                localStorage.setItem('age', age);
                calcTotal();
            }
            // switch (input.getAttribute('id')) {
            //     case 'height':
            //         height = +input.value;
            //         localStorage.setItem('height', height);
            //         calcTotal();
            //     case 'weight':
            //         weight = +input.value;
            //         localStorage.setItem('weight', weight);
            //         calcTotal();
            //     case 'age':
            //         age = +input.value;
            //         localStorage.setItem('age', age);
            //         calcTotal();
            // }
        });
        // input.value.textContent = (localStorage.getItem(set));
        calcTotal();
    }
    getDynamicInformation('#height', 'height');
    getDynamicInformation('#weight', 'weight');
    getDynamicInformation('#age', 'age');
}

//module.exports = calc;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
    class MenuClass {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">
                        ${this.title}
                    </h3>
                    <div class="menu__item-descr">
                        ${this.descr}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">
                            Цена:
                        </div>
                        <div class="menu__item-total">
                            <span>
                                ${this.price}
                            </span>
                                грн/день
                        </div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            createCard(data);
        });

    function createCard(data) {
        data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            const elem = document.createElement('div');
            price = (price * 2.43).toFixed(2);
            elem.classList.add('menu__item');

            elem.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">
                    ${title}
                </h3>
                <div class="menu__item-descr">
                    ${descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">
                        Цена:
                    </div>
                    <div class="menu__item-total">
                        <span>
                            ${price}
                        </span>
                            BYN/день
                    </div>
                </div>
            `;
            document.querySelector('.menu .container').append(elem);
        });
    }
}

//module.exports = cards;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostData(item);
    });

    const message = {
        load: './img/spinner.svg',
        success: 'Спасибо! Скоро вы вам перезвоним',
        failure: 'Что-то пошло не так'
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const loadModal = document.createElement('img');
            loadModal.src = message.load;

            loadModal.style.cssText = 'margin: 0 auto;';
            // `
            // position: absolute;
            // bottom: 5px;
            // left: 220px;
            // `;

            //загрузка
            form.insertAdjacentElement('afterend', loadModal);

            const formData = new FormData(form);
            const toJson = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', toJson)
                .then(data => {
                    console.log(data);
                    // успешно
                    showModal(message.success);
                    loadModal.remove();
                })
                .catch(() => {
                    //  неудача
                    showModal(message.failure);
                    loadModal.remove();
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
    <div class="modal__content">
                <form action="#">
                    <div data-close="" class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>
    `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            document.querySelector('form input').value = '';
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 3000);
    }
}

//module.exports = forms;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        const newLocal = e.code === 'Escape' && modal.classList.contains('show');
        if (newLocal) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //modal.style.cssText = `position: reletive;`;
    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, currentContainer, totalContainer,
        Wrapper, Area }) {
    const slider = document.querySelector(slide),
        slides = document.querySelectorAll(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentContainer),
        total = document.querySelector(totalContainer),
        sliderWrapper = document.querySelector(Wrapper),
        sliderArea = document.querySelector(Area);
        
       

    let numOfSlide = 1;
    let offset = 0;
    //second type
    sliderArea.style.width = 100 * slides.length + '%';
    slider.style.position = 'relative';
    
    const dots = document.createElement('ol'),
    dotsMas = [],
    widthOfSlide = window.getComputedStyle(sliderWrapper).width;

    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('dot__active');
        }
        dots.append(dot);
        dotsMas.push(dot);
    }

    slides.forEach(slide => {
        slide.style.width = widthOfSlide;
    });


    function currentTotal(num) {
        if (num < 1) {
            current.textContent = slides.length;
            numOfSlide = slides.length;
        }
        if (num > slides.length) {
            current.textContent = 1;
            numOfSlide = 1;
        }

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${numOfSlide}`;
        } else {
            total.textContent = slides.length;
            if (numOfSlide < 10) {
                current.textContent = `0${numOfSlide}`;
            } else {
                current.textContent = numOfSlide;
            }
        }
    }
    currentTotal(numOfSlide);

    function dotsSwitch(item, type, num) {
        item.forEach(dot => {
            dot.classList.remove(type);
        });
        item[num - 1].classList.add(type);
    }

    function plusMinOffset(go) {
        if (offset == 0 && go == prev) {
            offset = +widthOfSlide.replace(/\D/g, '') * (slides.length - 1);
        } else {
            if (go == prev) {
                offset -= +widthOfSlide.replace(/\D/g, '');
            }
        }

        if (offset == +widthOfSlide.replace(/\D/g, '') * (slides.length - 1) && go == next) {
            offset = 0;
        } else {
            if (go == next) {
                offset += +widthOfSlide.replace(/\D/g, '');
            }
        }
    }

    prev.addEventListener('click', function prevSlide() {
        plusMinOffset(prev);

        sliderArea.style.transform = `translateX(-${offset}px)`;

        if (numOfSlide < 1) {
            numOfSlide = numOfSlide;
        } else {
            numOfSlide--;
        }

        currentTotal(numOfSlide);
        dotsSwitch(dotsMas, 'dot__active', numOfSlide);
    });

    next.addEventListener('click', (e) => {
        plusMinOffset(next);

        plusMinOffset(widthOfSlide, '+');
        sliderArea.style.transform = `translateX(-${offset}px)`;

        if (numOfSlide == slides.length) {
            numOfSlide = 1;
        } else {
            numOfSlide++;
        }

        currentTotal(numOfSlide);
        dotsSwitch(dotsMas, 'dot__active', numOfSlide);
    });

    dotsMas.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            numOfSlide = slideTo;

            currentTotal(numOfSlide);

            offset = +widthOfSlide.slice(0, widthOfSlide.length - 2) * (slideTo - 1);
            sliderArea.style.transform = `translateX(-${offset}px)`;

            dotsSwitch(dotsMas, 'dot__active', numOfSlide);
        });
    });
}

// module.exports = slider;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContent, tabsParentSelector, activeClass) {
    const btnMenu = document.querySelectorAll(tabsSelector),
        menuContent = document.querySelectorAll(tabsContent),
        btnParent = document.querySelector(tabsParentSelector);

    function hideMenuContent() {
        menuContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        btnMenu.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showMenuContent(i = 0) {
        btnMenu[i].classList.add(activeClass);
        menuContent[i].classList.add('show', 'fade');
        menuContent[i].classList.remove('hide');
    }

    hideMenuContent();
    showMenuContent(0);

    btnParent.addEventListener('click', (event) => {
        const target = event.target;
        btnMenu.forEach((item, i) => {
            if (target == item) {
                hideMenuContent();
                showMenuContent(i);
            }
        });
    });
}

// module.exports = tabs;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(t / 1000 / 60 % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

// module.exports = timer;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRes": () => (/* binding */ getRes),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getRes(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}
 



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer', '2021-12-23 12:00');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        slide: '.offer__slider',
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentContainer: '#current',
        totalContainer: '#total',
        Wrapper: '.offer__slider-wrapper',
        Area: '.offer__slider-inner'
    });
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map