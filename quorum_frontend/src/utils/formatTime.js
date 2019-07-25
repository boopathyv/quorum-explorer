function formatTime(timestamp) {
	var currentTime = new Date().getTime();
	timestamp = Number(timestamp * 10 ** -6);
	var seconds = Math.floor((currentTime - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var returnValue = '';

	returnValue += days > 0 ? days + ' days' : '';
	hours = hours - days * 24;
	returnValue +=
		hours > 0 ? (returnValue !== '' ? ' ' : '') + hours + ' hours' : '';
	if (returnValue.indexOf('days') === -1) {
		minutes = minutes - days * 24 * 60 - hours * 60;
		returnValue +=
			minutes > 0 ? (returnValue !== '' ? ' ' : '') + minutes + ' mins' : '';
	}
	if (returnValue.indexOf('hours') === -1) {
		seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
		returnValue +=
			seconds > 0 ? (returnValue !== '' ? ' ' : '') + seconds + ' secs' : '';
	}
	return returnValue;
}

export default formatTime;
