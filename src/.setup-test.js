// /* eslint-disable */
// require('babel-register')();
// // const jsdom = require('jsdom').jsdom;
// import { jsdom } from 'jsdom';
import 'angular';
import 'angular-mocks';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

// let exposedProperties = ['window', 'navigator', 'document'];

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//     if (typeof global[property] === 'undefined') {
//         exposedProperties.push(property);
//         global[property] = document.defaultView[property];
//     }
// });

// global.navigator = {
//     userAgent: 'node.js'
// };

// documentRef = document;


// /* eslint-enable */
