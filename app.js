window.onload = function () {
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    let lengthItems = items.length - 1;
    let active = 0;

    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    };

    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    };

    let refreshInterval = setInterval(() => {
        next.click();
    }, 3000);


    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';

        let last_active_dot = document.querySelector('.slider .dots li.active');
        last_active_dot.classList.remove('active');
        dots[active].classList.add('active');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 3000);
    }

    const button = document.querySelector('.button')
        const nav    = document.querySelector('.nav')
        var bars = document.querySelectorAll('.header .button .bar');


        button.addEventListener('click',()=>{
            nav.classList.toggle('activo')
            bars.forEach(bar => {
                bar.classList.toggle('cerrar');
              });
        })

    

        function toggleMenu() {
            nav.classList.toggle('activo');
            bars.forEach(bar => {
                bar.classList.toggle('cerrar');
            });
        }
        
        document.querySelectorAll('.nav li').forEach(li => {
            li.addEventListener('click', toggleMenu);
        });


    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        });
    });

    window.onresize = function (event) {
        reloadSlider();
    };


    
};



