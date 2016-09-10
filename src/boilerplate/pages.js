import React, {
    PropTypes
} from 'react';
import { Link } from 'react-router';

const Pages = ({ children }) => (
    <div>
        <nav>
            <Link to={'/'}>Home</Link>
            <br />
            <Link to={'/contact'}>Contact</Link>
        </nav>
        {children}
    </div>
);

Pages.propTypes = {
    children: PropTypes.element
};

export default Pages;
