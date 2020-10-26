import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import NavigationBar from './components/navbar/navbar.jsx';
import HomePage from './Pages/HomePage';
import { createBrowserHistory } from 'history';
import Dashboard from './Pages/AdminPage/Dashboard';


function App() {
  return (
    <Router history={history}>
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/admin' exact component={Dashboard} />
      </Switch>
    </div>
  </Router>
  );
}


export const history = createBrowserHistory({ forceRefresh: true })
export default App;
