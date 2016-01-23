export function CapitalizeFilter() {
	return function(input) {
		return (input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) : '';
	};
}
