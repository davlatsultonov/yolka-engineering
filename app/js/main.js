$(document).ready(function(){
    // sliders
    const $slider = $('.slider');
    const $sliderProject = $('.slider--project');
    const $sliderBanner = $('.slider-banner');
    const $isSliderProject = $sliderProject.length;

    if ($slider.length || $isSliderProject) {
        const $hasSliderChildren = $slider.find('.slider__item').length > 1;

        $slider.owlCarousel({
            ...baseSliderOptions($slider, $hasSliderChildren),
            navText: $hasSliderChildren ? [`<img alt='slider-arrow-icon' src='images/icons/slider_arrow-left${$isSliderProject ? '--green' : ''}.svg'>`, `<img alt='slider-arrow-icon' src='images/icons/slider_arrow-right${$isSliderProject ? '--green' : ''}.svg'>`] : [],
            navContainer: `#slider${$isSliderProject ? '-project' : ''}-nav`,
            dots: $hasSliderChildren && !$isSliderProject,
            dotsContainer: $isSliderProject ? false : '#slider-dots',
        })

        $sliderProject.find('.slider__title').each((i, item) => {
            $(item).css('min-width', $(window).width() > 640 ? $(item).width() + 70 : '100%');
        })

        if ($hasSliderChildren) setDynamicWidthToSliderNav();
    }

    if ($sliderBanner.length) {
        const $hasSliderChildren = $sliderBanner.find('.banner__img').length > 1;

        $sliderBanner.owlCarousel({
            ...baseSliderOptions($sliderBanner, $hasSliderChildren),
            navContainer: '#slider-nav',
            dotsContainer: '#slider-dots',
        })

        if ($hasSliderChildren) setDynamicWidthToSliderNav();
    }

    setBlurredBackground('.slider__img', '.slider-hash-navigation__img', '.banner__img');
    // sliders end

    $(document).on('click', '[data-id="hamburger-btn"]', function () {
        console.log(this);
        $('#side-menu').toggleClass('active');
    })

    $(document).on('click', '#side-menu-close-btn', function () {
        $('#side-menu').removeClass('active');
    })

    $(document).on('click', '.back-drop', function () {
        $(this).parent().removeClass('active')
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

function setDynamicWidthToSliderNav() {
    const sliderDots = $('#slider-dots');
    const delta = $(window).width() < 480 ? 120 : 160;

    $('#slider-nav')
        .width(sliderDots.width() + delta)
        .height(sliderDots.height());
}

function baseSliderOptions(slider, hasSliderChildren) {
    return {
        loop: true,
        items: 1,
        autoHeight:true,
        nav: hasSliderChildren,
        navText: hasSliderChildren ? [`<img alt='slider-arrow-icon' src='images/icons/slider_arrow-left.svg'>`, `<img alt='slider-arrow-icon' src='images/icons/slider_arrow-right.svg'>`] : [],
        touchDrag: hasSliderChildren,
        mouseDrag: hasSliderChildren,
        dots: hasSliderChildren,
    }
}

function setBlurredBackground(...images) {
    if (!images.length) return;

    images.forEach(img => {
        const imageItems = document.querySelectorAll(`${img}`);

        if (!imageItems.length) return;

        imageItems.forEach((el) => {
            const childEl = $(el).find('.blurred-img__front')[0];

            if (!childEl) return;

            const imgSrc = childEl.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
            const newImage = new Image();
            newImage.src = imgSrc;
            newImage.onload = function () {
                const width = newImage.width;
                const height = newImage.height;
                const portrait = width < height;

                childEl.style.backgroundSize = (portrait) ? 'contain' : 'cover';

                if (portrait) $(createBlurredImgBack(imgSrc)).insertAfter(childEl)
            };
        });
    })
}

function createBlurredImgBack(imgSrc) {
    let div = document.createElement('div');
    div.classList.add('blurred-img__back');
    div.style.backgroundImage = `url(${imgSrc})`;

    return div;
}
