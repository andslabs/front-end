$(function ($) {
    $('#slider').bjqs({
        animtype: 'slide',
        height: 533,
        width: 800,
        responsive: true,
        randomstart: true
    });

    $('#tabs').tabs({
        show: { effect: "fade", duration: 300 },
        hide: { effect: "fade", duration: 300 },
    });

    $('.lightbox-gallery').frydBox();

    $('.colorbox-gallery').colorbox({rel:'colorbox-gallery', transition:"fade"});
});