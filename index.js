import ngReactifyModule from './src/ng-reactify-module';
import ngReactifyPageConfig from './src/ng-reactify-page-config';
import reactifyComponentRegister from './src/ng-reactify-component-register';
import './src/ng-reactify-directive';

const ngReactify = {
    name: ngReactifyModule.name,
    ngReactifyModule,
    ngReactifyPageConfig,
    reactifyComponentRegister,
    registerComponents: (mappingComponents) => {
        reactifyComponentRegister.set(mappingComponents);
        return ngReactify;
    },
    wrapRouteProvider: ($routeProvider) => {
        const patchedRouteProvider = $routeProvider;
        patchedRouteProvider.react = {
            when: (reactPageConfig, ngRouteConfig) => {
                const reactPage = ngReactifyPageConfig.getReactRoute(
                    reactPageConfig,
                    ngRouteConfig
                );
                return patchedRouteProvider.when(reactPage.path, reactPage.config)
                    .when(reactPageConfig.path, reactPage.config);
            }
        };
        return patchedRouteProvider;
    }
};

export { ngReactify };
export { ngReactifyModule };
export { ngReactifyPageConfig };
export { reactifyComponentRegister };
export default ngReactify;
