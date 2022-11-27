function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	
	if (modalTimerId) {
		clearTimeout(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
	const modalTrigger = document.querySelectorAll(triggerSelector);
	const modalCloseBtn = document.querySelector('[data-close]');

	// console.log("modal", modal);
	// console.log("modalTrigger", modalTrigger);
	// console.log("modalCloseBtn", modalCloseBtn);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modalCloseBtn.addEventListener('click', () => closeModal(modalSelector));

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	modal.addEventListener('click', (e) => {
		//console.log(e.target);
		if (e.target === modal) {
			closeModal(modalSelector);
		}
		//closeModal();
	});

	//const modalTimerID = setTimeout(openModal, 6000);

	function showModalByScroll() {
		const { pageYOffset } = window;
		const { clientHeight, scrollHeight } = document.documentElement;
		// const pageYOffset = window.pageYOffset;
		// const clientHeight = document.documentElement.clientHeight;
		// const scrollHeight = document.documentElement.scrollHeight;
		// console.log("------------------");
		// console.log("pageYOffset", window.pageYOffset);
		// console.log("clientHeight", document.documentElement.clientHeight);
		// console.log("scrollHeight", document.documentElement.scrollHeight);
		// console.log("------------------");

		// console.log(Math.ceil(pageYOffset + clientHeight));
		// console.log(scrollHeight);
		if (pageYOffset + clientHeight >= scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		} 
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { openModal, closeModal };