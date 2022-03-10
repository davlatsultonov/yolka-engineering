$(document).ready(function(){
    const $slider = $('.slider');
    const $hasSliderChildren = $slider.children().length > 1;
    $slider.owlCarousel({
        loop:false,
        nav: $hasSliderChildren,
        dots: $hasSliderChildren,
        items: 1,
        navText: $hasSliderChildren ? ["<img src='images/icons/slider_arrow-left.svg'>", "<img src='images/icons/slider_arrow-right.svg'>"] : [],
        navContainer: '#slider-nav',
        dotsContainer:'#slider-dots',
        autoHeight:true,
        touchDrag: $hasSliderChildren,
        mouseDrag: $hasSliderChildren,
    })
    if ($hasSliderChildren) $('#slider-nav').width($('#slider-dots').width() + ($(window).width() < 480 ? 120 : 160)).height($('#slider-dots').height())

    $(document).on('click', '#hamburger-btn', function () {
        $('#side-menu').toggleClass('active');
    })

    $(document).on('click', '#side-menu-close-btn', function () {
        $('#side-menu').removeClass('active');
    })

    $(document).on('click', function (e) {
        if (!e.target.closest('#side-menu') && !e.target.closest('#hamburger-btn')) $('#side-menu').removeClass('active');
    })

    // video
    $(document).on('click', '#video-play-btn', function () {
        const videoBlockWrapper = $(".card__video");
        const videoBlockOverlay = videoBlockWrapper.find('.card__video-overlay');
        const videoBlock = videoBlockWrapper.find('#video');
        videoBlock.attr('controls', 'true')[0].play();
        videoBlockOverlay.remove();
        $(this).remove()
    })
});
