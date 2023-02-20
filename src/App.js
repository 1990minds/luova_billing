import React from 'react';
import Dashboard  from './components';
import PrivateRoute from './components/auth/privateRoute'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';

import AdminLogin from './components/auth/login'


function App() {
  return (
     <Router>
    <main className="App">

    <PrivateRoute path="/admin" component={Dashboard} />
  <Route path="/" component={AdminLogin} exact/>

    </main>
    </Router>

 
  );
}

export default App;

