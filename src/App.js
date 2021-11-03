import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Backend from './classes/Backend';
import UserDashBoard from './components/UserDashBoard/UserDashBoard';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      backend : new Backend(),
      currentUser: null
    }
  }
  



  setCurrentUser = (user) => {
    this.setState({currentUser : user})
    
  }

  render(){
    return (

        <BrowserRouter>
          <Switch>
            //render login page}
            <Route exact path='/' render={() =>(<Login backend ={this.state.backend} setCurrentUser = {this.setCurrentUser} />)}/>
            //render registration page
            <Route exact path='/register' render={() =>(<Register backend ={this.state.backend} />)}/>
            //render UserDashBoard
            <Route exact path='/userDashBoard' render={() =>(<UserDashBoard backend ={this.state.backend} currentUser ={this.state.currentUser}/>)}/>
            //render AdminDashBoard
            <Route exact path='/adminDashBoard' render={() =>(<AdminDashBoard backend ={this.state.backend} currentUser ={this.state.currentUser}/>)}/>
          </Switch>
        </BrowserRouter>
      
  
      );
    }
  }
  

export default App;
