import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Pages from './pages';
import PageContact from './page-contact';
import PageHome from './page-home';

const PagesRoutes = (() => (
    <Route path="">
        <Route path="" component={Pages}>
            <IndexRoute component={PageHome} />
            <Route path="contact" component={PageContact} />
        </Route>
    </Route>
));

export default PagesRoutes;
