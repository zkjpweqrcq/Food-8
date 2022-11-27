import { openModal } from './modal';

function forms(formsSelector, modalSelector, modalTimerId) {
    const forms = document.querySelectorAll(formsSelector);

	forms.forEach((item) => {
		postData(item);
	});

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы свяжемся с вами',
		failure: 'Что-то пошло не так...'
	}

	async function postData(form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			//form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
			//console.log(formData);
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});

			try {
				const url = 'https://jsonplaceholder.typicode.com/posts';
				const res = await fetch(url, {
				  method: 'POST',
				  body: JSON.stringify(object),
				  headers: {
				    'Content-type': 'application/json; charset=UTF-8',
				  },
				});

				// const dataObj = await res.json();
				// console.log(dataObj);
				// console.log(res);

				if(res.ok) {
					showThanksModal(message.success);
				} else {
					throw new Error('Form not work');
				}
			} catch (error) {
				console.error(error.message);
				showThanksModal(message.failure);
			} finally {
				form.reset();
				statusMessage.remove();
			}

			// try {
			// 	console.log(qweqwe);
			// 	console.log("qweqwe");
			// } catch(error) {
			// 	console.error('name',error.name);
			// 	console.error('message',error.message);
			// 	console.error('stack',error.stack);
			// }

			// console.log('I`m important');

		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		prevModalDialog.classList.remove('show');

		openModal(modalSelector, modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(modalSelector).append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 2000);
	}
}

export default forms;