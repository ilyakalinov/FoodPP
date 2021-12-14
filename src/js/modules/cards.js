import {getRes} from '../services/services';

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

export default cards;