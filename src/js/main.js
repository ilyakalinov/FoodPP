window.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelectorAll('.tabheader__item'),
        menuContent = document.querySelectorAll('.tabcontent'),
        btnParent = document.querySelector('.tabheader__items');
    //Tabs
    function hideMenuContent() {
        menuContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        btnMenu.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showMenuContent(i = 0) {
        btnMenu[i].classList.add('tabheader__item_active');
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

    //timer

    const deadline = '2021-12-2 12:30';

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

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Используем классы для карточек
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

    const getRes = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // getRes('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuClass(/* obj.img, obj.altimg, obj.title, obj.descr, obj.price */ img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // getRes('http://localhost:3000/menu')
    // .then(data => {
    //     createCard(data);
    // });

    axios.get('http://localhost:3000/menu')
    .then(data => {
        createCard(data);
    });

    function createCard(data) {
        data.data.forEach(({img, altimg, title, descr, price}) => {
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
 
    // new MenuClass(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     15,
    //     '.menu .container', 'menu__item', 'big'
    // ).render();
    // new MenuClass(
    //     'img/tabs/elite.jpg',
    //     'elite',
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!!',
    //     18,
    //     '.menu .container', 'menu__item', 'big'
    // ).render();
    // new MenuClass(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     14,
    //     '.menu .container', 'menu__item', 'big'
    // ).render();

    // Forms
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

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

    const message = {
        load: './img/spinner.svg',
        success: 'Спасибо! Скоро вы вам перезвоним',
        failure: 'Что-то пошло не так'
    };



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //const request = new XMLHttpRequest();
        
            //request.open('POST', 'server.php');
            //request.setRequestHeader('Content-type', 'application/json');
            const loadModal = document.createElement('img');
            loadModal.src = message.load;
            loadModal.style.cssText = ``;  
            
            //загрузка
            form.insertAdjacentElement('afterend', loadModal);
 
            const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function (a, b) {
            //     obj[b] = a;
            // });
            const toJson = JSON.stringify(Object.fromEntries(formData.entries()));
//////////////////////////////////////////////////////
            // const obj = {
            //     a:23,
            //     b: 'dmkdfdfmsdk'
            // };
            // console.log(Object.entries(obj));
//////////////////////////////////////////////////////
            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json' 
            //     },
            //     body: JSON.stringify(obj)
            // })
            postData('http://localhost:3000/requests', toJson)
            // .then(data => data.text())
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

            
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         // успешно
            //         showModal(message.success);
            //         form.reset();
            //         loadModal.remove();
            //     } else {
            //         //неудача
            //         showModal(message.failure);
            //         form.reset();
            //         loadModal.remove();
            //     }
            // });
        });
    }

    function showModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();

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
            closeModal();
        }, 3000);
    }

    //Slider

    const slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'), 
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderArea = document.querySelector('.offer__slider-inner'),

        widthOfSlide = window.getComputedStyle(sliderWrapper).width;

        let numOfSlide = 1;
        let offset = 0;
        //second type
        sliderArea.style.width = 100 * slides.length + '%';

        slider.style.position = 'relative';

        //Dots
        const dots = document.createElement('ol'),
            dotsMas = [];

        dots.classList.add('carousel-indicators');
        slider.append(dots);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
             if(i == 0) {
                dot.classList.add('dot__active');
            }
            dots.append(dot);
            dotsMas.push(dot); 
        }
        
        slides.forEach(slide => {
            slide.style.width = widthOfSlide;
        });


        function currentTotal(num){
            if(num < 1){
                current.textContent = slides.length;
                numOfSlide = slides.length;
            }
            if(num > slides.length) {
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

        function dotsSwitch(item, type, num){
            item.forEach(dot => {
                dot.classList.remove(type);
            });
            item[num - 1].classList.add(type);
        }

        prev.addEventListener('click', function prevSlide() {

            if (offset == 0) {
                offset = +widthOfSlide.slice(0, widthOfSlide.length - 2) * (slides.length - 1);
            } else {
                offset -= +widthOfSlide.slice(0, widthOfSlide.length - 2);
            }

            sliderArea.style.transform = `translateX(-${offset}px)`;

            if (numOfSlide < 1) {
                numOfSlide = numOfSlide;
            } else {
                numOfSlide--;
            }

            currentTotal(numOfSlide);
            dotsSwitch(dotsMas, 'dot__active', numOfSlide);
        });

        next.addEventListener('click', () => {
            
            if (offset == +widthOfSlide.slice(0, widthOfSlide.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +widthOfSlide.slice(0, widthOfSlide.length - 2);
            }
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
        
        // //firs type

        // showSlide(numOfSlide);
        // function showSlide(num) {
        //     if(num > slides.length) {
        //         numOfSlide = 1;
        //     } 
        //     if (num < 1) {
        //         numOfSlide = slides.length;
        //     }
        //     slides.forEach(item => {
        //         item.classList.add('hide');
        //         item.classList.remove('show', 'fade');
        //     });
        //     slides[numOfSlide - 1].classList.add('show','fade');
        //     slides[numOfSlide - 1].classList.remove('hide');
        //     if(slides.length < 10) {
        //         total.textContent = `0${slides.length}`;
        //         curren.textContent = `0${numOfSlide}`;
        //     } else {
        //         total.textContent = slides.length;
        //         if (numOfSlide < 10) {
        //             current.textContent = `0${numOfSlide}`;
        //         } else {
        //             current.textContent = numOfSlide;
        //         }
        //     }
        // }
        
        // function plusSlide(num) {
        //     showSlide(numOfSlide += num);
        // }

        // prev.addEventListener('click',() => {
        //     plusSlide(-1);
        // });
        // next.addEventListener('click',() => {
        //     plusSlide(+1);
        // });
});