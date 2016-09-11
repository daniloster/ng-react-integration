/* eslint-disable */
import React, {
    PropTypes,
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import ngReact from './ng-reactify-module';

ngReact.directive('ngReactifyComponent', NgReactifyComponent);

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
        const CustomComponent = reactifyComponentRegister.get(scope.component),
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
            let ReactComponent;
            if (scope.route) {
                // class WrapperComponent extends Component {
                //     constructor(innerProps) {
                //         super(innerProps);
                //     }

                //     getChildContext() {
                //         return props;
                //     }

                //     render() {
                //         return (
                //             <div>
                //                 {this.props.children}
                //             </div>
                //         );
                //     }
                // }
                // WrapperComponent.propTypes = {
                //     children: PropTypes.element
                // };
                // WrapperComponent.getChildContext = () => props;
                // WrapperComponent.childContextTypes = defineChildContextTypes(props);

                const WrapperComponent = ({ children }) =>  (
                    <div>
                        {children}
                    </div>
                );

                console.log('ngReactifyComponent WrapperComponent.childContextTypes', WrapperComponent.childContextTypes);
                console.log('ngReactifyComponent route', scope.route);
                console.log('ngReactifyComponent history', scope.history);

                const RouterComponent = () => {
                    return (
                        <Router history={scope.history}>
                            <Route
                                path={scope.route}
                                component={WrapperComponent}
                            >
                                {CustomComponent()}
                            </Route>
                        </Router>
                    );
                };
                if (scope.store) {
                    ReactComponent = () => (
                        <Provider store={scope.store}>
                            {RouterComponent()}
                        </Provider>
                    ); 
                } else {
                    ReactComponent = () => (
                        <div>
                            {RouterComponent()}
                        </div>
                    );
                }
            } else {
                if (scope.store) {
                    ReactComponent = () => (
                        <Provider store={scope.store}>
                            <CustomComponent {...props}></CustomComponent>
                        </Provider>
                    );
                } else {
                    ReactComponent = () => (
                        <div>
                            <CustomComponent {...props}></CustomComponent>
                        </div>
                    );
                }
            }

            console.log('ngReactifyComponent ReactComponent', ReactComponent);
            ReactDOM.render(
                <ReactComponent />,
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

                                render(scope.props);
                            }
                        }
                    })
                );
            }
        }
    }
}

let isPatched = false;
function getType(props, key) {
    const target = props[key];
    if (target) {
        if (Array.isArray(target)) {
            return PropTypes.array;
        } else if (target['$$typeof'] === 'Symbol(react.element)') {
            return PropTypes.element;
        } else if (typeof target === 'object') {
            return PropTypes.object;
        } else if (!Number.isNaN(Number(target))) {
            return PropTypes.number;
        } else if (target.toUpperCase) {
            return PropTypes.string;
        } else if (false == new Boolean(false) || true == new Boolean(true)) {
            return PropTypes.bool;
        }
    } else {
        return null;
    }
}

function defineChildContextTypes(props) {
    return Object.keys(props).reduce((map, key) => {
        const currentType = getType(props, key);
        if (currentType) {
            map[key] = currentType;
        }
    }, {});
}

/* eslint-enable */
