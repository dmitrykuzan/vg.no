const header = document.querySelector('.header');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

// menu
burger.addEventListener('click', () => {
    burgerToggle();
    document.getElementsByTagName('body')[0].classList.toggle('no-scroll');
    menu.classList.toggle('menu--active');
    setTimeout(function () {
        menu.classList.toggle('menu--blur');
    }, 100);
});



document.addEventListener('DOMContentLoaded', () => {
    // services mobile
    let serviceLink = document.querySelectorAll('.services__mobile_item');
    let serviceBack = document.querySelectorAll('.services__full_back');
    let serviceBtn = document.querySelectorAll('.services__full_link');
    for (let i = 0; i < serviceLink.length; i++) {
        let id = serviceLink[i].getAttribute('data-mobile');
        serviceLink[i].onclick = () => {
            if (window.outerWidth < 1024) {
                document.getElementById(id).style.display = 'block';
                document.getElementsByTagName('body')[0].classList.add('no-scroll');
                header.style.transform = 'translateY(0)';
            }
            return false;
        }
        serviceBack[i].onclick = () => {
            document.getElementById(id).style.display = 'none';
            document.getElementsByTagName('body')[0].classList.remove('no-scroll');
            return false;
        }
        serviceBtn[i].onclick = () => {
            if (window.outerWidth < 1024) {
                document.getElementById(id).style.display = 'none';
                document.getElementsByTagName('body')[0].classList.remove('no-scroll');
            }
            return false;
        }
    }

    //gallery
    baguetteBox.run('.result__gallery_item');


    // phone mask
    let phoneInput = document.querySelectorAll(".maskTel");
    phoneInput.forEach(elem => {
        elem.addEventListener("input", mask, false);
        elem.addEventListener("focus", mask, false);
        elem.addEventListener("blur", mask, false);
    })

});


// scroll anchor
document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function (e) {
        e.preventDefault();

        if (menu.classList.contains('menu--active')) {

            burgerToggle();
            document.getElementsByTagName('body')[0].classList.toggle('no-scroll');
            menu.classList.toggle('menu--active');
            setTimeout(function () {
                menu.classList.toggle('menu--blur');
            }, 100);
        }

        let href = this.getAttribute('href').substring(1);

        console.log(href);
        const scrollTarget = document.getElementById(href);
        const topOffset = 200;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


// header bg resize
window.addEventListener('load', () => {
    removeHeaderBg();
});
window.addEventListener('resize', () => {
    removeHeaderBg();
    if (window.outerWidth > 1024) {
        document.querySelectorAll('.services__full').forEach(elem => {
            elem.style.display = 'block';
        });
    }
});


let scroll = 100;
window.addEventListener('scroll', () => {
    currentScroll = window.scrollY;
    // header scroll
    if (!menu.classList.contains('menu--active')) {
        if (currentScroll == 0) {
            header.style.transform = 'translateY(0)';
            header.classList.remove('header--bg', 'header--small');
        } else if (currentScroll > scroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.classList.add('header--bg', 'header--small');
        }
        scroll = currentScroll;
    }
});



let decor = document.querySelectorAll('.draggable');
let decorReverse = document.querySelectorAll('.draggable-reverse');
let bg1 = document.querySelectorAll('.drag-bg1');
let bg2 = document.querySelectorAll('.drag-bg2');
let bg3 = document.querySelectorAll('.drag-bg3');
if (window.outerWidth > 1024) {
    window.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        decor.forEach(elem => {
            elem.style.transform = 'translate(' + x * -15 + 'px, ' + y * -15 + 'px)';
        })
        decorReverse.forEach(elem => {
            elem.style.transform = 'translate(' + x * 15 + 'px, ' + y * 15 + 'px)';
        })
        bg1.forEach(elem => {
            elem.style.transform = 'scale(1.01) translateY(' + y * -20 + 'px)';
        });
        bg2.forEach(elem => {
            elem.style.transform = 'scale(1.01) translateY(' + y * -40 + 'px)';
        });
        bg3.forEach(elem => {
            elem.style.transform = 'scale(1.01) translateY(' + y * -60 + 'px)';
        });
    });
}






////////////////////////////// SLIDERS ///////////////////////////////

// slider section 1
const partnersSlider = new Swiper('.main__slider', {
    slidesPerView: 'auto',
    pagination: {
        el: '.main__pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 6
        }
    }
});


// slider quiz
const quizSlider = new Swiper('.quiz__slider', {
    spaceBetween: 100,
    allowTouchMove: false,
    pagination: {
        el: '.quiz__pagination',
    },
    navigation: {
        prevEl: '.quiz__prev'
    }
});

// slider quiz validation
const quizForm = document.getElementById('quiz_form');
const quizNext = document.querySelector('.quiz__next');
const slider = document.querySelector('.quiz__slider');

quizNext.onclick = () => {
    let quizInput = slider.querySelector('.swiper-wrapper').querySelector('.swiper-slide-active').querySelector('.quiz__answer');
    quizInput.classList.remove('quiz__answer--error');
    if (quizInput.value.length > 0) {
        quizSlider.slideNext();
    } else {
        setTimeout(function () {
            quizInput.classList.add('quiz__answer--error');
        }, 50);
    }
}

// slide quiz buttons
quizSlider.on('slideChange', () => {
    let total = quizSlider.slides.length,
        index = quizSlider.realIndex;

    if (index !== 0) {
        document.querySelector('.quiz__prev').classList.remove('quiz__btn--disabled');
    } else {
        document.querySelector('.quiz__prev').classList.add('quiz__btn--disabled');
    }

    if (index + 2 == total) { // последний вопрос, отправка формы
        quizNext.innerHTML = 'Отправить';
    } else {
        quizNext.innerHTML = 'Следующий шаг';
    }

    if (index + 1 == total) {
        quizNext.onclick = formSend(); // quiz.js
        document.querySelectorAll('.fade').forEach(elem => {
            elem.classList.add('fade--out');
        })
    }
});










// slider result
const resultSlider = new Swiper('.result__slider', {
    spaceBetween: 100,
    navigation: {
        prevEl: '.result__prev',
        nextEl: '.result__next'
    },
    pagination: {
        el: '.result__pagination'
    }
});

// slider team
const teamSlider = new Swiper('.team__slider', {
    navigation: {
        prevEl: '.team__prev',
        nextEl: '.team__next'
    }
});



////////////////////////////////// FUNCTIONS ///////////////////////////////////////////

function burgerToggle() {
    burger.classList.toggle('burger--active');
}


function removeHeaderBg() {
    if (window.innerWidth > 1024) {
        header.classList.remove('header--bg');
    } else {
        header.classList.add('header--bg');
    }

    burger.addEventListener('click', () => {
        header.classList.remove('header--bg');
    });
}


function sendQuiz() {
    let form = document.getElementById('quiz_form');
    console.log(form.serialize());
}