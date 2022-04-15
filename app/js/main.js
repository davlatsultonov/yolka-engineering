$(document).ready(function(){
    const $slider = $('.slider');
    const $sliderProject = $('.slider--project');
    const $isSliderProject = $sliderProject.length;
    const $hasSliderChildren = $slider.children().length > 1;
    $slider.owlCarousel({
        loop: true,
        nav: $hasSliderChildren,
        dots: $hasSliderChildren && !$isSliderProject,
        items: 1,
        navText: $hasSliderChildren ? [`<img alt='slider-arrow-icon' src='images/icons/slider_arrow-left${$isSliderProject ? '--green' : ''}.svg'>`, `<img alt='slider-arrow-icon' src='images/icons/slider_arrow-right${$isSliderProject ? '--green' : ''}.svg'>`] : [],
        navContainer: `#slider${$isSliderProject ? '-project' : ''}-nav`,
        dotsContainer: $isSliderProject ? false : '#slider-dots',
        autoHeight:true,
        touchDrag: $hasSliderChildren,
        mouseDrag: $hasSliderChildren,
    })

    $sliderProject.find('.slider__title').each((i, item) => {
        $(item).css('min-width', $(window).width() > 640 ? $(item).width() + 70 : '100%');
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
        const videoBlockWrapper = $(".video");
        const videoBlockOverlay = videoBlockWrapper.find('.video__overlay');
        const videoBlock = videoBlockWrapper.find('#video');
        videoBlockWrapper.css('border', '1px solid rgba(89,89,89,0.62)');
        videoBlock.attr('controls', 'true')[0].play();
        videoBlockOverlay.remove();
        $(this).remove()
    })
});
