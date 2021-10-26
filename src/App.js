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
      backend : new Backend,
      currentUser: null
    }
  }
  



  setCurrentUser = (user) => {
    console.log(user)
    this.setState({currentUser : user}, () => console.log(this.state.currentUser))
    
  }

  render(){
    return (

        <BrowserRouter>
          <Switch>
            //render login page
            <Route exact path='/' render={() =>(<Login backend ={this.state.backend} setCurrentUser = {this.setCurrentUser} />)}/>
            //render registration page
            <Route exact path='/register' render={() =>(<Register backend ={this.state.backend} />)}/>
            //render UserDashBoard
            <Route exact path='/userDashBoard' render={() =>(<UserDashBoard  currentUser ={this.state.currentUser}/>)}/>

          </Switch>
        </BrowserRouter>
      
  
      );
    }
  }
  

export default App;
