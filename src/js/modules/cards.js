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
}

module.exports = cards;