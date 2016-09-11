/* eslint-disable */
import React, {
    Component,
    PropTypes
} from 'react';
import { Link, IndexLink } from 'react-router';

class Pages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * Whenever you are creating a link, it is likely to use a 
         * route management to provide access to other components.
         * Thus, it is important capture the parent context path in
         * order to define relative paths.
         * 
         * Even if you are not using a route management, this code
         * manages well the capture of parent route.
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
}

Pages.contextTypes = {
    router: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Pages.propTypes = {
    children: PropTypes.element
};

export default Pages;
/* eslint-enable */
