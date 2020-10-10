import React, { Children } from 'react';
import Dashboard from './pages/Dashboard';

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
import dashboardHome from './pages/dashboardHome';
import parents from './pages/parents'; 
import children from './pages/children';
import contactss from './pages/contactss';
import reports from './pages/reports';
import stat from './pages/stat';
import SignUp from './pages/addParent';

function App() {
  return (
   <Router> 
    <div className="App">
      {/* <Navbar /> */}
      <Dashboard />

      <Switch>
        
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contacts}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        {/* <Route exact path="/dashboard" component={Dashboard}/> */}
        <Route exact path="/home" component={dashboardHome}/>
        <Route exact path="/parentss" component={parents}/>
        <Route exact path="/childrenn" component={children}/>
        <Route exact path="/contactss" component={contactss}/>
        <Route exact path="/reports" component={reports}/>
        <Route exact path="/stat" component={stat}/>
        <Route exact path="/addParent" component={SignUp}/>

        
        <Route exact path="/" component={Home}/>
        <Route component={NotFound} />
      </Switch>
      
      
    </div>
  </Router>  
  );
}

export default App;
 