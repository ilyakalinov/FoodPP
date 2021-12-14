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
            console.log(localStorage.getItem(set));
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
        input.value.textContent = (localStorage.getItem(set));
        calcTotal();
    }
    getDynamicInformation('#height', 'height');
    getDynamicInformation('#weight', 'weight');
    getDynamicInformation('#age', 'age');
}

module.exports = calc;