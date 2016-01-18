(function(){
	"use strict";

	angular.module('app.config').config(function($authProvider) {

		/* Configuration file for Satellizer's handling of login authentication */		
		$authProvider.storageType = 'localStorage';
		
	    $authProvider.facebook({
	      clientId: 'Facebook App ID'
	    });

	    $authProvider.google({
	      clientId: 'Google Client ID'
	    });

	    $authProvider.github({
	      clientId: 'GitHub Client ID'
	    });

	    $authProvider.linkedin({
	      clientId: 'LinkedIn Client ID'
	    });

	    $authProvider.instagram({
	      clientId: 'Instagram Client ID'
	    });

	    $authProvider.yahoo({
	      clientId: 'Yahoo Client ID / Consumer Key'
	    });

	    $authProvider.live({
	      clientId: 'Microsoft Client ID'
	    });

	    $authProvider.twitch({
	      clientId: 'Twitch Client ID'
	    });

	    $authProvider.bitbucket({
	      clientId: 'Bitbucket Client ID'
	    });

	    // No additional setup required for Twitter

	    $authProvider.oauth2({
	      name: 'foursquare',
	      url: '/auth/foursquare',
	      clientId: 'Foursquare Client ID',
	      redirectUri: window.location.origin,
	      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
	    });
	
});

})();
