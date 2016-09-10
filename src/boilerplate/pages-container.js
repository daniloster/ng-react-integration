import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Pages from './pages';
import PageContact from './page-contact';
import PageHome from './page-home';

const PagesContainer = (() => (
    <IndexRoute component={Pages}>
        <IndexRoute component={PageHome} />
        <Route path="contact" component={PageContact} />
    </IndexRoute>
));

export default PagesContainer;
