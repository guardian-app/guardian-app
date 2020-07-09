import React from 'react';
import Dashboard from './Dashboard';

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
        <Route component={NotFound} />
      </Switch>
      
      
    </div>
  </Router>  
  );
}

export default App;
 