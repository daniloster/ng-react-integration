/* eslint-disable */
import ngReact from './ng-reactify-module';

import React, {
    PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

ngReact.directive('ngReactifyComponent', NgReactifyComponent);

let isPatched = false;

NgReactifyComponent.$inject = ['ReactifyComponentRegister', '$rootScope', '$route'];
function NgReactifyComponent(reactifyComponentRegister, $rootScope, $route) {
    return {
        restrict: 'A',
        scope: {
            // accepts a history object that might be passed down through controllers
            history: '=?',
            // accepts a path string that might be passed down as directive attribute
            route: '@?',
            // accepts a JSON object with values and function which must match with
            // the component loaded
            props: '=?',
            // accepts a store object that might be passed down through controllers
            store: '=?',
            // KeyName of the component that will be looked after in the getReactComponent
            component: '@ngReactifyComponent'
        },
        link
    };

    function link(scope, element) {
        const Component = reactifyComponentRegister.get(scope.component),
            unsubscribers = [];
        let lastRoute = null,
            routeParams = {};

        init();

        function init() {
            console.log('ngReactifyComponent scope', scope);
            if (scope.route) {
                console.log('ngReactifyComponent patched');
                patchAngularRouteChange();
            }
            unsubscribers.push(scope.$watch(() => scope.props,
            (newProps, oldProps) => {
                if (newProps === oldProps) return;
                render(newProps);
            }));

            element.on('$destroy', () => {
                isPatched = false;
                unmount();
                unsubscribers.forEach((unsubscribe) => {
                    unsubscribe();
                });
            });

            render(scope.props);
        }

        function unmount() {
            console.log('ngReactifyComponent unmount');
            ReactDOM.unmountComponentAtNode(element[0]);
        }

        function render(props = {}) {
            console.log('ngReactifyComponent render');
            let CustomComponent;
            if (scope.route) {
                const WrapperComponent = ({ children }) => (
                    <div>
                        {children}
                    </div>
                );
                WrapperComponent.propTypes = {
                    children: PropTypes.element
                };
                
                console.log('ngReactifyComponent route', scope.route);
                console.log('ngReactifyComponent history', scope.history);

                const RouterComponent = () => (
                    <Router history={scope.history}>
                        <Route
                            path={scope.route}
                            component={WrapperComponent}
                        >
                            <Component {...props} />
                        </Route>
                    </Router>
                );
                CustomComponent = RouterComponent;
            } else {
                CustomComponent = () => (
                    <Component {...scope.props}></Component>
                );
            }
            let ProvidedCustomComponent;
            if (scope.store) {
                console.log('ngReactifyComponent store', scope.store);
                const StoreComponent = () => (
                    <Provider store={scope.store}>
                        <CustomComponent />
                    </Provider>
                );
                ProvidedCustomComponent = StoreComponent;
            } else {
                ProvidedCustomComponent = CustomComponent;
            }

            console.log('ngReactifyComponent ProvidedCustomComponent', ProvidedCustomComponent);
            ReactDOM.render(
                <ProvidedCustomComponent />,
                element[0]
            );
        }

        function isChildNode(url) {
            return url.indexOf(scope.route) > -1;
        }

        /**
         * Observe changes on the URL to identify when should load or not the new controller
         * and template assigned to the current URL. For instance, we are keeping the same
         * controller and template alive and avoiding new instantiation and compilation. Once,
         * all them are related to the same component.
         * (based on parent URL: {path})
         */
        function patchAngularRouteChange() {
            if (!isPatched) {
                isPatched = true;

                unsubscribers.push($rootScope.$on('$locationChangeStart', () => {
                    lastRoute = $route.current;
                }));

                unsubscribers.push(
                    $rootScope.$on('$locationChangeSuccess', (event, newUrl, oldUrl) => {
                        if (isChildNode(newUrl) || isChildNode(oldUrl)) {
                            /**
                             * Having new data, controller has to notify the wrapped component
                             */
                            const lastRouteParams = JSON.stringify(lastRoute.params);
                            const currentRouteParams = JSON.stringify($route.current.params);
                            if (lastRouteParams !== currentRouteParams) {
                                routeParams = $route.current.params;
                                $route.current = lastRoute;
                                $route.current.params = routeParams;

                                render();
                            }
                        }
                    })
                );
            }
        }
    }
}
/* eslint-enable */
