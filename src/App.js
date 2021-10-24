import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import React, {useState} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import User from './classes/User';
import Backend from './classes/Backend';
import UserDashBoard from './components/UserDashBoard';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      backend : new Backend
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }
  


  setCurrentUser(user){
    console.log(this)
    this.setState({currentUser : user})
  }

  render(){
    return (

        <BrowserRouter>
          <Switch>
            //render login page
            <Route exact path='/' render={() =>(<Login backend ={this.state.backend} />)}/>
            //render registration page
            <Route exact path='/register' render={() =>(<Register backend ={this.state.backend} />)}/>
            //render UserDashBoard
            <Route exact path='/userDashBoard' render={() =>(<UserDashBoard key = {this.state.backend} backend ={this.state.backend}/>)}/>

          </Switch>
        </BrowserRouter>
      
  
      );
    }
  }
  

export default App;
