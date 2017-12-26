'use strict'

$(function () {
    var width = 800;
    var animationSpeed = 3000;
    var pause = 4000;
    var currentSlide = 1;
    var direction = 'normal';
    var directionOnce = '';

    var $slider = $('#slider');
    var $slideContainer = $slider.find('.container__list');
    var $slides = $slideContainer.find('.container__list__item');
    var $prev = $slider.find('#Prev');
    var $next = $slider.find('#Next');

    var interval;

    function runAnimation() {
        if (direction === 'normal') {
            interval = setInterval(function () {
                if (++currentSlide > $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                } else {
                    $slideContainer.animate({'margin-left': '-=' + width}, animationSpeed, function () {
                        if (currentSlide === $slides.length){
                            currentSlide = 1;
                            $slideContainer.css('margin-left', 0);
                        }
                    });
                }
            }, pause);
        } else if (direction === 'reverse') {
            interval = setInterval(function () {
                if (--currentSlide < 1) {
                    currentSlide = $slides.length;
                    $slideContainer.css('margin-left', (width * (currentSlide - 1)));
                } else {
                    $slideContainer.animate({'margin-left': '+=' + width}, animationSpeed);
                }
            }, pause);
        } else {
            console.log('Error runAnimation in direction parameters settings...');
        }
    }

    function runAnimationOnce() {
        if (directionOnce === 'normal') {
            //console.log('Next animation');
            if (++currentSlide > $slides.length) {
                currentSlide = 1;
                $slideContainer.css('margin-left', 0);
            } else {
                $slideContainer.animate({'margin-left': '-=' + width}, animationSpeed);
            }
        } else if (directionOnce === 'reverse') {
            //console.log('Prev animation');
            var currentWidth;
            if (currentSlide > 1) {
                currentWidth = (currentSlide - 2) * width;
                currentSlide--;
            } else if (currentSlide === 1) {
                currentSlide = $slides.length;
                currentWidth =  (currentSlide - 1) * width;
            }
            $slideContainer.animate({'margin-left': '-' + currentWidth}, animationSpeed);
        }

        directionOnce = '';
        runAnimation();
    }

    function stopAnimation() {
        clearInterval(interval);
    }

    $prev.click(function () {
        stopAnimation();
        //console.log('previous clicked');
        directionOnce = 'reverse';
        runAnimationOnce();
    });

    $next.click(function () {
        stopAnimation();
        //console.log('next clicked');
        directionOnce = 'normal';
        runAnimationOnce();
    });

    runAnimation();
});