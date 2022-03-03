$(document).ready(function(){
    const $slider = $('.slider');
    const $hasSliderChildren = $slider.children().length > 1;
    $slider.owlCarousel({
        loop:true,
        nav: $hasSliderChildren,
        dots: $hasSliderChildren,
        items: 1,
        navText: $hasSliderChildren ? ["<img src='../images/icons/slider_arrow-left.svg'>", "<img src='../images/icons/slider_arrow-right.svg'>"] : [],
        navContainer: '#slider-nav',
        dotsContainer:'#slider-dots',
        autoHeight:true
    })
    if ($hasSliderChildren) $('#slider-nav').width($('#slider-dots').width() + ($(window).width() < 480 ? 120 : 160)).height($('#slider-dots').height())

});
