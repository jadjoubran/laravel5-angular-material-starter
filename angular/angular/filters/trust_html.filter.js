export function TrustHtmlFilter($sce) {
	return function(html) {
		return $sce.trustAsHtml(html);
	};
}
