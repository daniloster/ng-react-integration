/* global document */
/* eslint-disable */
import angular from 'angular';
import 'angular-route';
import ngReactify from '../index';

import HelloWorld from '../src/boilerplate/hello-world';
import Comment from '../src/boilerplate/comment';
import PagesRoutes from '../src/boilerplate/pages-routes';
import Counter from '../src/boilerplate/counter';

import store from '../src/boilerplate/store';
import { hashHistory } from 'react-router';

ngReactify.registerComponents({
    HelloWorld,
    Comment,
    PagesRoutes,
    Counter
});
const reactPageConfig = {
    path: '/pages',
    componentName: 'PagesRoutes',
    history: hashHistory
};

const ngRouteConfig = {
    // angular configuration for route
};

const reactCounterPageConfig = {
    path: '/counter',
    componentName: 'Counter',
    store
};

const appName = 'app-angular';
const appModule = angular.module(appName, [ngReactify.name, 'ngRoute']);

    appModule.config(['$routeProvider', ($routeProvider) => {
        ngReactify.wrapRouteProvider($routeProvider)
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
                        <a href='#/counter'>
                            Counter
                        </a>
                        <br />
                        <a href='#/counter-no-wrappers'>
                            Counter (No Wrappers)
                        </a>
                        <br />
                        <a href='#/there-is-no-such-url/'>
                            There is no such URL
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
            .react.when(reactPageConfig, ngRouteConfig)
            .react.when(reactCounterPageConfig, ngRouteConfig)
            .when('/counter-no-wrappers', {
                controller: [function () {
                    const vm = this;
                    vm.store = store;
                }],
                controllerAs: 'vm',
                template: `
                    <div>
                        <div
                            ng-reactify-component="Counter"
                            store="vm.store"
                        ></div>
                    </div>
                `
            })
            .otherwise({
                template: '<h1>SORRY! ERROR!</h1>'
            });
    }]);

export default appModule;
/* eslint-enable */
