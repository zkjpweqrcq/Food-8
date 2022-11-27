function timer(timerSelector, deadline) {
    //const deadline = '2022-10-20';

	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		//console.log(total / 1000 / 60 / 60 / 24);

		const days = Math.floor(total / 1000 / 60 / 60 / 24);
		const hours = Math.floor(total / 1000 / 60 / 60 % 24);
		const minutes = Math.floor(total / 1000 / 60 % 60);
		const seconds = Math.floor(total / 1000 % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		}
	}
	//console.log(getTimeRemaining(deadline));

	function getZero(num) {
		if (num < 10) {
			return '0' + num;
		}

		return num;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeIntervalID = setInterval(updateClock, 1000);

		function updateClock(){
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if(t.total <= 0) {
				clearInterval(timeIntervalID);
				days.innerHTML = 0;
				hours.innerHTML = 0;
				minutes.innerHTML = 0;
				seconds.innerHTML = 0;
			}
		}
	}

	setClock(timerSelector, deadline);
}

export default timer;