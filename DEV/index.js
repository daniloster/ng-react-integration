/* global document */
import angular from 'angular';
import appAngular from './app-angular';

angular.element(document).ready(() => {
    angular.bootstrap(document, [appAngular.name]);
});
