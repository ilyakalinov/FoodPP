window.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelectorAll('.tabheader__item'),
        menuContent = document.querySelectorAll('.tabcontent'),
        btnParent = document.querySelector('.tabheader__items');

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
});