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
        };

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

    const deadline = '2021-11-23 12:30';

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

    function updateClock () {
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
            if(e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            } 
        });

        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 3000);

        function showModalByScroll () {
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

    new MenuClass(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        15,
        '.menu .container', 'menu__item', 'big'
    ).render();
    new MenuClass(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!!',
        18,
        '.menu .container', 'menu__item', 'big'
    ).render();
    new MenuClass(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14  ,
        '.menu .container', 'menu__item', 'big'
    ).render();

    //Forms

        const form = document.querySelectorAll('form');

        const message = {
            load: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы вам перезвоним',
            failure: 'Что-то пошло не так'
        };

        form.forEach(item => {
            postData(item);
        });

        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.load;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                statusMessage.textContent = message.load;

                form.insertAdjacentElement('afterend', statusMessage);

                const formData = new FormData(form);

                const object = {};
                formData.forEach(function(value, key) {
                    object[key] = value;
                });


                fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.classList.remove('show', 'fade');
                    statusMessage.classList.add('hide');
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

                function showThanksModal(message) {
                    const prevModalDialog = document.querySelector('.modal__dialog');
                    prevModalDialog.classList.add('hide');
                    openModal();

                    const thanksModal = document.createElement('div');
                    thanksModal.classList.add('modal__dialog');
                    thanksModal.innerHTML = `
                    <div class="modal__content">
                        <div class="modal__close" data-close>×</div>
                        <div class="modal__title">${message}</div>
                    </div>
                    `;

                    const thanksModalBlock = document.querySelector('.modal');
                    thanksModalBlock.append(thanksModal);
                    setTimeout(() => {
                        thanksModal.remove();
                        prevModalDialog.classList.add('show');
                        prevModalDialog.classList.remove('hide');
                        closeModal();
                        statusMessage.style.cssText = ``;
                    }, 4000);

                }
            });
        }

        fetch(' http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
        
});