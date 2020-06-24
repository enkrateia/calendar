import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import Monthly from './components/Monthly';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Monthly</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Redirect exact from='/' to='/monthly' />
          <Route path='/monthly'>
            <Monthly />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
