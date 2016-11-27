export function TrustHtmlFilter($sce) {
    'ngInject';
	return function(html) {
		return $sce.trustAsHtml(html);
	};
}
