import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.factory('API', APIService)
	.factory('DialogService', DialogService)
	.factory('ToastService', ToastService)
