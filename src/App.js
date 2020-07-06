import React from 'react';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
    {/* <Route exact path="/" render={props=> (
      <React.Fragment>
        {<SignIn/>}
      </React.Fragment>
    )} /> */}
     <Route path="/dashboard" component={Dashboard}/> 
     <Route path="/signup" component={SignUp}/> 
     <Route path="/signin" component={SignIn}/>
     
    </div>
    </Router>
  );
}

export default App;
 