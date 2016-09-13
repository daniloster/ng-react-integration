/* eslint-disable */
import appAngular from './app-angular';
import {
    ngReactify,
    ngReactifyPageConfig,
    reactifyComponentRegister
} from '../index';

import { hashHistory } from 'react-router';

const reactPageConfig = {
    path: '/pages',
    componentName: 'PagesRoutes',
    history: hashHistory
};
const angularRouteConfig = {
    // angular configuration for route
};
const reactPage = ngReactifyPageConfig.getReactRoute(reactPageConfig, angularRouteConfig);

describe('ngReactify', () => {
    beforeEach(angular.mock.module(appAngular.name));

    let $controller, $injector, $rootScope, $scope, $compile;

    beforeEach(inject((_$controller_, _$injector_, _$rootScope_, _$compile_) => {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $injector = _$injector_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    describe('angular controller reactify', () => {
        it('should show the react component HelloWorld in the angular template', () => {
            const $scope = $rootScope.$new();
            const controller = $controller(reactPage.config.controller, { $scope, $injector });
            const $html = $compile(`
                <div ng-reactify-component="HelloWorld"></div>
            `)($scope);

            expect($html.text()).toBe('hello world!');
        });

        it('should show the react component Comment in the angular template', () => {
            const $scope = $rootScope.$new();
            const controller = $controller(reactPage.config.controller, { $scope, $injector });
            const $html = $compile(`
                <div ng-reactify-component="Comment" props="{ author: 'Leticia', text: 'Some lovely message' }"></div>
            `)($scope);

            expect($html.text()).toBe('LeticiaSome lovely message');
        });
    });
});

/* eslint-enable */
