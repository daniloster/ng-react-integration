/* global document */
/* eslint-disable */
import angular from 'angular';
import 'angular-route';
import {
    ngReactify,
    ngReactifyPageConfig,
    reactifyComponentRegister
} from '../index';

import HelloWorld from '../src/boilerplate/hello-world';
import Comment from '../src/boilerplate/comment';
import PagesRoutes from '../src/boilerplate/pages-routes';
import { hashHistory } from 'react-router';

reactifyComponentRegister.set({
    HelloWorld,
    Comment,
    PagesRoutes
});
const reactPageConfig = {
    path: '/pages',
    componentName: 'PagesRoutes',
    history: hashHistory
};
const angularRouteConfig = {
    // angular configuration for route
};
const reactPage = ngReactifyPageConfig.getReactRoute(reactPageConfig, angularRouteConfig);

const appName = 'app-angular';
const appModule = angular.module(appName, [ngReactify.name, 'ngRoute']);

    appModule.config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                template: `
                    <div>
                        I AM ON THE HOME PAGE
                        <br />
                        <a href='#/hello-world/'>
                            Hello World
                        </a>
                        <br />
                        <a href='#/comment/'>
                            Comment
                        </a>
                        <br />
                        <a href='#/pages'>
                            Pages
                        </a>
                        <br />
                        <a href='#/react-me-ngdirective-withroute/'>
                            Reactify me ngdirective with react router!
                        </a>
                        <br />
                        <a href='#/react-me-ngdirective-withroute-nowildcard/'>
                            Reactify me ngdirective with react router, but with no wildcard!
                        </a>
                    </div>
            `
            })
            .when('/hello-world', {
                template: `
                    <div>
                        <div ng-reactify-component="HelloWorld"></div>
                    </div>
                `
            })
            .when('/comment', {
                template: `
                    <div>
                        <div
                            ng-reactify-component="Comment"
                            props="{ author: 'Danilo Castro', text: 'Complete text!' }"
                        ></div>
                    </div>
                `
            })
            .when(reactPage.path, reactPage.config)
            .when(reactPageConfig.path, reactPage.config)
            .otherwise({
                template: '<h1>SORRY! ERROR!</h1>'
            });
    }]);

export default appModule;
/* eslint-enable */
