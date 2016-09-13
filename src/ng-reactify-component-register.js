import ngReact from './ng-reactify-module';

function ReactifyComponentRegister() {
    const componentsMapping = {};

    function setItem(name, component) {
        if (Object.keys(componentsMapping).indexOf(name) > -1) {
            throw new Error(`Component ${name} is already in use!`);
        }
        if (!component) {
            throw new Error(`Component ${name} is invalid!`);
        }

        componentsMapping[name] = component;
    }

    this.set = (map) => {
        Object.keys(map).forEach(componentName => {
            setItem(componentName, map[componentName]);
        });
    };
    this.get = (component) => componentsMapping[component];
}

const register = new ReactifyComponentRegister();

function ReactifyComponentRegisterFactory() {
    return register;
}

ngReact.factory('ReactifyComponentRegister', ReactifyComponentRegisterFactory);

export default register;
