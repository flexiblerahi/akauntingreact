import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import store from '../../redux-store/store';
import LandingCorporate from './Landing';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;
  const [userEmail, setUserEmail] = useState('');

  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path="/app" >

            <Application history={history} userEmail={userEmail} setUserEmail={setUserEmail} />

          </Route>
          <Route >
            <Auth userEmail={userEmail} setUserEmail={setUserEmail} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
