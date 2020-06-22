// scripting

// Jquery Script
$(function () {

    var device = $(window).width();

    Waves.attach('.nav-link, .submenu li', ['waves-dark waves-block']);
    Waves.init();

    // Mobile menu
    document.querySelector('[data-toggle="offcanvas"]').addEventListener('click', function () {
        document.querySelector('.offcanvas-collapse').classList.toggle('open')
    })

});