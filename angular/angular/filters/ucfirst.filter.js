export function UcFirstFilter() {
	return function(input) {
		if (!input) {
			return null;
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	};
}
