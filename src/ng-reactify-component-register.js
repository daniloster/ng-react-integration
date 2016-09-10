import ngReact from './ng-reactify-module';

function ReactifyComponentRegister() {
    const componentsMapping = {};
    this.set = set;
    this.get = get;

    function set(map) {
        Object.keys(map).forEach(componentName => {
            setItem(componentName, map[componentName]);
        });
    }

    function setItem(name, component) {
        if (Object.keys(componentsMapping).indexOf(name) > -1) {
            throw new Error(`Component ${name} is already in use!`);
        }
        if (!component) {
            throw new Error(`Component ${name} is invalid!`);
        }

        componentsMapping[name] = component;
    }

    function get(component) {
        return componentsMapping[component];
    }
}

const register = new ReactifyComponentRegister();

function ReactifyComponentRegisterFactory() {
    return register;
}

ngReact.factory('ReactifyComponentRegister', ReactifyComponentRegisterFactory);

export default register;
