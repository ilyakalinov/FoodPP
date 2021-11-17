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

    const deadline = '2021-11-18';

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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    
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

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
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
});