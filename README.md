# ng-reactify
npm module to integrate angularjs and reactjs.

## Motivation
I have been working with angularjs for more than 2 years. I am backend guy amazed with frontend world 
and I would like to make frontend development easier than it is.
First of all, we need to think out of the box. Thinking about reactjs, especially, functional programming,
it is a bit different from convetional OO programming so, (git it five minute)[https://signalvnoise.com/posts/3124-give-it-five-minutes].
Seriously, it is just a new approach for new problems that we have been facing with the web evolution.

## Angular-React integration example
Here is an angular app using es6. Notice the following comment after the code.
```
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
angular.module(appName, [ngReactify.name, 'ngRoute'])
    .config(['$routeProvider', ($routeProvider) => {
        console.log('ROUTE CONFIGURED', reactPage);
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

angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
```
### React compoennts
For react components with links <Link /> (it is very important, we just cover react-router), they must have
a dynamic baseUrl like the following code. Doing so, the ng-reactify module is able to manage the route changes.

Look the method render inside the component below.
```
import React, {
    Component
} from 'react';

class MyComponent extends Component
render() {
    /**
        * Whenever you are creating a link, it is likely to use a 
        * route management to provide access to other components.
        * Thus, it is important capture the parent context path in
        * order to define relative paths.
        * 
        * Even if you are not using a route manager, this code
        * handles well the capture of parent context path.
        * 
        * Expected result for non-managed-routes: ''
        * Expected result for managed-routes: <the-correct-parent-url>
        */
    const index = (this.props.routes || []).indexOf(this.props.route || {});
    const basePath = this.props.routes
        .slice(0, index)
        .filter(route => !!route.path)
        .map(route => route.path)
        .join('/');
    return (
        <div>
            <nav>
                <IndexLink to={[basePath, '/'].join('')}>Home</IndexLink>
                <br />
                <Link to={[basePath, '/contact'].join('')}>Contact</Link>
                <br />
                <Link to={[basePath, '/../'].join('')}>Angular Home</Link>
            </nav>
            {this.props.children}
        </div>
    );
}
```

Please, check out our DEV folder, you will find out a proper example. Once you install
the ng-reactify module, go to node_modules/ng-reactify/DEV and have a look on app-angular
file.

## Happy for sharing it!
Thanks for all support and help us making pull request ot optimise this module! 