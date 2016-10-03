/* eslint-disable */
const wildcard = 'wildcard';
const ngReactConfig = {
    getReactPath,
    getReactRoute,
    getController: getReactPageController
};

export default ngReactConfig;

function getReactPath(path = '') {
    const subPath = `:${wildcard}*?`;
    if (path.indexOf(subPath) === -1) {
        return [
            path,
            path[path.length - 1] === '/'
            ? ''
            : '/',
            subPath
        ].join('');
    }
    return null;
}

function getReactRoute(reactOptions, angularRouteOptions) {
    const ReactComponentController = getReactPageController(reactOptions);
    return {
        path: getReactPath(reactOptions.path),
        config: Object.assign(
            {},
            {
                controller: ReactComponentController,
                template: `
                    <div>
                        <div
                            ng-reactify-component="${reactOptions.componentName}"
                            props="props"
                            store="store"
                            ${
                                reactOptions.history
                                ? `history="history"
                                route="${reactOptions.path}"`
                                : ''
                            }
                            
                        ></div>
                    </div>
                `
            },
            angularRouteOptions)
    };
}

/**
 * It creates a angular controller to manage react components for angular routes.
 * */
function getReactPageController({
    path = '/',
    props = () => {},
    store = null,
    history = null
    }) {
    return ['$scope', '$injector'].concat([ReactPageController]);
    function ReactPageController($scope, $injector) {
        init();
        
        function init() {
            $scope.store = store;
            $scope.history = history;
            $scope.props = props($injector);
            $scope.route = path;
        }
    }
}
/* eslint-enable */
