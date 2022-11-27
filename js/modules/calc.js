export default function calc() {
    const result = document.querySelector('.calculating__result span');
	let gender;
	let height, weight, age, ratio;

	if (localStorage.getItem('gender')) {
		gender = localStorage.getItem('gender');
	} else {
		gender = 'female';
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('gender')) {
				console.log('gender');
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				console.log('ratio');
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!gender || !height || !weight || !age || !ratio) {
			result.textContent = "____";
			return;
		}

		if (gender === 'female') {
			const bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
			result.textContent = Math.round(bmr * ratio);
		} 
		else if (gender === 'male') {
			const bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
			result.textContent = Math.round(bmr * ratio);
		}
	}

	// height = 180;
	// weight = 80;
	// age = 37;
	// ratio = 1.725;
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {

				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				}
				else {
					gender = e.target.getAttribute('id');
					localStorage.setItem('gender', gender);
				}

				elements.forEach(elem => elem.classList.remove(activeClass));
				e.target.classList.add(activeClass);

				calcTotal();
			})
		})
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			if (input.getAttribute('id') === "height") {
				height = +input.value;
			}
			if (input.getAttribute('id') === "weight") {
				weight = +input.value;
			}
			if (input.getAttribute('id') === "age") {
				age = +input.value;
			}

			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}


// export default calc;