import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/antd.css"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Switch>
      <Route path="/admin" render={routeProps => <App {...routeProps}></App>}></Route>
      <Redirect from='/' exact to='/login' />
      {mainRoutes.map(route => {
        return <Route key={route.path} {...route}></Route>
      })}
    </Switch>
  </Router>
);




