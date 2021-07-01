import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './users/pages/Users';
import NewPage from './places/pages/NewPage';

function App() {
  return <Router>
          <Switch>
            <Route path='/' exact>
              <Users />
            </Route>
            <Route path='/places/new' exact>
              <NewPage />
            </Route>
            <Redirect to='/' />
          </Switch>
        </Router>
}

export default App;
