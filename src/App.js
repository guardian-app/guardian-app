import React from 'react';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Navbar from './layouts/Navbar';

function App() {
  return (
   <Router> 
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contacts}/>
      </Switch>
      
      
    </div>
  </Router>  
  );
}

export default App;
 