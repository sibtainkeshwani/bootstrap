// scripting

$(function () {

    var device = $(window).width();

    Waves.attach('.nav-link, .submenu li', ['waves-dark waves-block']);
    Waves.init();

    // Mobile menu

    $('.has-submenu').on('click', function (e) {
        e.preventDefault();
        var checkactivemenu = $(this).parent().hasClass('menuactive');

        $('.nav-item').removeClass('menuactive');
        $('.submenu').slideUp();
        if (checkactivemenu === false) {
            $(this).parent().addClass('menuactive');
            $('.menuactive .submenu').slideDown();
        }
        return false;
    });

    // Open sidebar mobile menu

    $('.mobilemenutrigger').on('click', function () {
        $('.menu-wrapper').toggleClass('activemenu');
        const activesidebar = $('.menu-wrapper').hasClass('activemenu');
        if (activesidebar === true) {
            $('body').css("overflow","hidden");
            $('.menu-wrapper').animate({
                width: "100vw"
            })
        }
        else if (activesidebar !== true) {
            $('body').css("overflow","");
            $('.menu-wrapper').animate({
                width: "0px"
            })
        }
    });

    if (device > 767) {
        $('body').on('click', function (e) {
            if ($(e.target).closest(".submenu").length === 0) {
                $(".submenu").fadeOut();
            }
        });
    }


});