import React from 'react';
import Dashboard from './Dashboard';
import ManageUsers from './ManageUsers';

import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './layouts/Navbar';
import NotFound from './pages/NotFound';
import Tcontact from './TContacts/Tcontact';
import Addcontact from './TContacts/Addcontact';

function App() {
  return (
   <Router> 
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contacts}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/manageusers" component={ManageUsers}/>
        <Route exact path="/tcontacts/tcontact" component={Tcontact}/>
        <Route exact path="/tcontacts/add" component={Addcontact}/>
        <Route component={NotFound} />
      </Switch>
      
      
    </div>
  </Router>  
  );
}

export default App;
 