import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import HelloWorld from './hello-world';

describe('HelloWorld component', () => {
    it('should show Hello World with class hello-world--content for shallow', () => {
        expect(shallow(<HelloWorld />).is('.hello-world--content')).toBeTruthy();
    });
    it('should show Hello World with text "hello world!" for mount', () => {
        expect(mount(<HelloWorld />).text())
            .toBe('hello world!I am a static component that is not consuming anything.');
    });
    it('should show Hello World with text "hello world!" for render', () => {
        expect(render(<HelloWorld />).text())
            .toBe('hello world!I am a static component that is not consuming anything.');
    });
});
