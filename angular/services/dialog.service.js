(function(){
	"use strict";

	angular.module("app.services").factory('DialogService', function($mdDialog){

		return {
			fromTemplate: function(template, options){
				if ( !template ){
					return false;
				}

				if ( !options ){
					options = {};
				}

				options.templateUrl = './views/dialogs/' + template + '/' + template + '.html'

				return $mdDialog.show(options);
			},

			hide: function(){
				return $mdDialog.hide();
			},

			alert: function(title, content){
				$mdDialog.show(
					$mdDialog.alert()
						.title(title)
						.content(content)
						.ok('Ok')
				);
			},

			confirm: function(title, content) {
				return $mdDialog.show(
					$mdDialog.confirm()
						.title(title)
						.content(content)
						.ok('Ok')
						.cancel('Cancel')
				);
			}
		};
	});
})();
