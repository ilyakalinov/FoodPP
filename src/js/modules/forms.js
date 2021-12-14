import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', toJson)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 3000);
    }
}

//module.exports = forms;

export default forms;
