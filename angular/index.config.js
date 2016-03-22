import {LoadingBar}	from './config/loading_bar.config';
import {ThemeConfig} from './config/theme.config';
import {SatellizerConfig} from './config/satellizer.config';

angular.module('app.config')
	.config(LoadingBar)
	.config(ThemeConfig)
	.config(SatellizerConfig);
