import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Forgot} from './components/Forgot'
import {Reset} from './components/Reset'
import Root from './components/Root'
import Navbar from './components/Navbar'
import Pnf from './components/Pnf'

const App =()=>{

    return(
      <React.Fragment>
       <Router>
         <Navbar/>
         <Switch>
           <Route exact path="/" component={Signup}/>
           <Route  exact path="/signup" component={Signup}/>
           <Route exact path="/signin" component={Login}/>
           <Route exact path="/root" component={Root}/>
           <Route exact path="/forgot" component={Forgot}/>
           <Route exact path="/reset/:token" component={Reset}/>
           <Route exact path="**" component={Pnf}/>
         </Switch>
       </Router>
      </React.Fragment>
    )
  }


export default App;
