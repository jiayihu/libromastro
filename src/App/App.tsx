import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../features/dashboard/Dashboard/Dashboard';
import { Transactions } from '../features/transactions/Transactions/Transactions';
import { Navigation } from '../features/navigation/Navigation/Navigation';

export function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/transactions" exact>
          <Transactions />
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
      <Navigation />
    </div>
  );
}
