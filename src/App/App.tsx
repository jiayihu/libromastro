import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Transactions } from '../features/transactions/Transactions';
import { Navigation } from '../features/navigation/Navigation';
import { DashboardShell } from '../features/dashboard/DashboardShell';

export function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <DashboardShell />
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
