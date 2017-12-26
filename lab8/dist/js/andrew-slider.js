"use strict";

var cssSlideFirst = void 0,
    cssSlideSecond = void 0,
    slideInterval = void 0;
var playing = true;

var getRule = function getRule() {
	var rule = void 0;
	var ss = document.styleSheets;
	for (var i = 0; i < ss.length; ++i) {
		for (var x = 0; x < ss[i].cssRules.length; ++x) {
			rule = ss[i].cssRules[x];
			if (rule.name === "slideSecond" && rule.type === CSSRule.KEYFRAMES_RULE) {
				cssSlideFirst = rule;
			}
			if (rule.name === "slideFirst" && rule.type === CSSRule.KEYFRAMES_RULE) {
				cssSlideSecond = rule;
			}
		}
	}
};
getRule();

var setContainerWidth = function setContainerWidth(newWidth) {
	if (typeof newWidth === 'number') {
		document.getElementsByClassName('slider').style.width = newWidth + "px";
	}
};

var slider = {
	_slidesNumber: 10,
	_currentSlide: 1,
	_animationName: 'slideFirst',
	_containerWidth: 800,
	_direction: 'normal',
	_directionOnce: '',
	_animationSpeed: 5,
	_animationTimeout: 5000,

	get slidesNumber() {
		return this._slidesNumber;
	},

	get currentSlide() {
		return this._currentSlide;
	},

	get animationName() {
		return this._animationName;
	},

	get containerWidth() {
		return this._containerWidth;
	},

	get direction() {
		return this._direction;
	},

	get directionOnce() {
		return this._directionOnce;
	},

	get animationSpeed() {
		return this._animationSpeed;
	},

	get animationTimeout() {
		return this._animationTimeout;
	},

	set slidesNumber(numb) {
		if (typeof numb === 'number') {
			this._slidesNumber = numb;
		} else {
			console.log('Error setting slides number...');
		}
	},

	set containerWidth(numb) {
		if (typeof numb === 'number') {
			this._containerWidth = numb;
			setContainerWidth(numb);
		} else {
			console.log('Error setting slides number...');
		}
	},

	set direction(direct) {
		if (direct === 'normal' || direct === 'reverse') {
			this._direction = direct;
		} else {
			console.log('Error setting direction...');
		}
	},

	set directionOnce(dirOnce) {
		if (dirOnce === 'normal' || dirOnce === 'reverse' || dirOnce === '') {
			this._directionOnce = dirOnce;
		} else {
			console.log('Error setting directionOnce...');
		}
	},

	set currentSlide(numb) {
		if (typeof numb === 'number') {
			this._currentSlide = numb;
		} else {
			console.log('Error in setting current clide...');
		}
	},

	set animationName(animName) {
		this._animationName = animName;
	},

	set animationTimeout(tout) {
		if (typeof tout === 'number') {
			this._animationTimeout = tout;
		} else {
			console.log('Error setting timeout...');
		}
	},

	setParams: function setParams(props) {
		this._slidesNumber = props.slidesNumber;
		this._currentSlide = props.currentSlide;
		this._containerWidth = props.containerWidth;
		this._direction = props.direction;
	}
};

var setAnimationParameters = function setAnimationParameters() {
	var elements = Array.from(document.getElementsByClassName('container__list__item'));
	elements.forEach(function (element) {
		element.style.animationName = slider.animationName;
		element.style.animationDuration = slider.animationSpeed + 's';
	});
};

var pauseSlider = function pauseSlider() {
	playing = false;
	clearInterval(slideInterval);
};

var playSlideshow = function playSlideshow() {
	playing = true;
	slideInterval = setInterval(run, slider.animationTimeout);
};

var runAnimation = function runAnimation() {
	var direction = void 0,
	    distance = void 0,
	    current = void 0;

	if (slider.directionOnce !== '') {
		direction = slider.directionOnce;
	} else {
		direction = slider.direction;
	}

	if (direction === 'normal') {
		distance = (slider.currentSlide - 1) * 800;
		if (distance >= 800) {
			current = distance - 800;
		} else {
			current = distance;
		}
		console.log('Current: ' + current);
		console.log('Distance: ' + distance);
		if (slider.animationName === 'slideFirst') {
			cssSlideSecond.deleteRule("0");
			cssSlideSecond.deleteRule("1");
			cssSlideSecond.appendRule("0% { transform: translateX(-" + current + "px); }");
			cssSlideSecond.appendRule("100% { transform: translateX(-" + distance + "px); }");
			setAnimationParameters();
			slider.animationName = 'slideSecond';
			console.log('Current animation: ' + slider.animationName);
		} else {
			cssSlideFirst.deleteRule("0");
			cssSlideFirst.deleteRule("1");
			cssSlideFirst.appendRule("0% { transform: translateX(-" + current + "px); }");
			cssSlideFirst.appendRule("100% { transform: translateX(-" + distance + "px); }");
			setAnimationParameters();
			slider.animationName = 'slideFirst';
			console.log('Current animation: ' + slider.animationName);
		}
	} else if (direction === 'reverse') {
		current = (slider.currentSlide - 1) * 800;
		if (current >= 800) {
			distance = current - 800;
		} else {
			distance = (slider.slidesNumber - 1) * 800;
		}
		console.log('Current: ' + current);
		console.log('Distance: ' + distance);
		if (slider.animationName === 'slideFirst') {
			cssSlideSecond.deleteRule("0");
			cssSlideSecond.deleteRule("1");
			cssSlideSecond.appendRule("0% { transform: translateX(-" + current + "px); }");
			cssSlideSecond.appendRule("100% { transform: translateX(-" + distance + "px); }");
			setAnimationParameters();
			slider.animationName = 'slideSecond';
			console.log('Current animation: ' + slider.animationName);
		} else {
			cssSlideFirst.deleteRule("0");
			cssSlideFirst.deleteRule("1");
			cssSlideFirst.appendRule("0% { transform: translateX(-" + current + "px); }");
			cssSlideFirst.appendRule("100% { transform: translateX(-" + distance + "px); }");
			setAnimationParameters();
			slider.animationName = 'slideFirst';
			console.log('Current animation: ' + slider.animationName);
		}
	}
	if (slider.directionOnce !== '') {
		slider.directionOnce = '';
	}
};

var run = function run() {
	if (slider.direction === 'normal') {
		if (slider.currentSlide < slider.slidesNumber) {
			slider.currentSlide += 1;
			console.log('Current slide: ' + slider.currentSlide);
			runAnimation(slider);
		} else {
			slider.currentSlide = 1;
			runAnimation(slider);
		}
	} else if (slider.direction === 'reverse') {
		if (slider.currentSlide > 1) {
			slider.currentSlide -= 1;
			console.log('Current slide: ' + slider.currentSlide);
			runAnimation(slider);
		} else if (slider.currentSlide === 1) {
			slider.currentSlide = slider.slidesNumber;
			runAnimation(slider);
		}
	} else {
		console.log('Error in direction settings. Cannot render animation...');
	}
};

var scrollNormal = function scrollNormal() {
	console.log('scroll normal');
	pauseSlider();
	slider.directionOnce = 'normal';
	slider.currentSlide += 1;
	runAnimation();
	playSlideshow();
};

var scrollReverse = function scrollReverse() {
	console.log('scroll reverse');
	pauseSlider();
	slider.directionOnce = 'reverse';
	runAnimation();
	slider.currentSlide -= 1;
	playSlideshow();
};

slideInterval = setInterval(run, slider.animationTimeout);