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

export default tabs;