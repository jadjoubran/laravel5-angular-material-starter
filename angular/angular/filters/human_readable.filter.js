export function HumanReadableFilter() {
	return function humanize(str) {
		if (!str) {
			return '';
		}
		var frags = str.split('_');
		for (var i = 0; i < frags.length; i++) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
		}
		return frags.join(' ');
	};
}
