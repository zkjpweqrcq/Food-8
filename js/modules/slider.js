function slider({ 
	container, 
	slide, 
	nextArrow, 
	prevArrow, 
	totalCounter, 
	currentCounter,
	wrapper,
	field
}) {
    let slideIndex = 1;
	let offset = 0;

	const slides = document.querySelectorAll(slide);
	const slider = document.querySelector(container);
	const prev = document.querySelector(prevArrow);
	const next = document.querySelector(nextArrow);
	const total = document.querySelector(totalCounter);
	const current = document.querySelector(currentCounter);
	const slidesWrapper = document.querySelector(wrapper);
	const width = window.getComputedStyle(slidesWrapper).width;
	const slidesField = document.querySelector(field);

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol');
	const dots = [];

	indicators.classList.add('carousel-indicators');
	// indicators.style.cssText = `
	// 	position: absolute;
	// 	right: 0;
	// 	bottom: 0;
	// 	left: 0;
	// 	z-index: 15;
	// 	display: flex;
	// 	justify-content: center;
	// 	margin-right: 15%;
	// 	margin-left: 15%;
	// 	list-style: none;
	// `;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('indicator');
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	if (slides.length < 10) {
		total.textContent = '0' + slides.length;
	} else {
		total.textContent = slides.length;
	}

	if (slideIndex < 10) {
		current.textContent = '0' + slideIndex;
	} else {
		current.textContent = slideIndex;
	}

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach((item) => item.style.display = 'none');

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slideIndex < 10) {
	// 		current.textContent = '0' + slideIndex;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// showSlides(slideIndex);

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n)
	// }

	prev.addEventListener('click', () => {
		//plusSlides(-1);
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slideIndex < 10) {
			current.textContent = '0' + slideIndex;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1; 
	});

	next.addEventListener('click', () => {
		//plusSlides(1);
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slideIndex < 10) {
			current.textContent = '0' + slideIndex;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1; 
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			slideIndex = slideTo;

			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slideIndex < 10) {
				current.textContent = '0' + slideIndex;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = 0.5);
			dots[slideIndex - 1].style.opacity = 1; 
		})
	})
}

export default slider;