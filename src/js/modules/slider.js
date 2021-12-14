function slider() {
    const slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderArea = document.querySelector('.offer__slider-inner'),
        dots = document.createElement('ol'),
        dotsMas = [],
        widthOfSlide = window.getComputedStyle(sliderWrapper).width;

    let numOfSlide = 1;
    let offset = 0;
    //second type
    sliderArea.style.width = 100 * slides.length + '%';
    slider.style.position = 'relative';

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

module.exports = slider;