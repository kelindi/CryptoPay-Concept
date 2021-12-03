import './App.css';
import {Route, Switch, BrowserRouter,Router} from 'react-router-dom'
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Backend from './classes/Backend';
import UserDashBoard from './components/UserDashBoard/UserDashBoard';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import detectEthereumProvider from '@metamask/detect-provider'
import GetWallet from './components/GetWallet.js';


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

  connectWallet = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.enable(); //connect Metamask
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address
                  }
                  return obj;
               
          } catch (error) {
              return {
                  connectedStatus: false,
                  status: "Connect to Metamask using the button on the top right."
              }
          }
          
    } else {
          return {
              connectedStatus: false,
              status: "You must install Metamask into your browser: https://metamask.io/download.html"
          }
        } 
  };

  render(){
     
      return (
        <BrowserRouter>
          <Switch>
            
            <Route exact path='/' render={() =>(<Login connectWallet = {this.connectWallet} backend ={this.state.backend} setCurrentUser = {this.setCurrentUser} />)}/>
            
            <Route exact path='/register' render={() =>(<Register backend ={this.state.backend} />)}/>
            
            <Route exact path='/userDashBoard' render={() =>(<UserDashBoard backend ={this.state.backend} currentUser ={this.state.currentUser}/>)}/>
            
            <Route exact path='/adminDashBoard' render={() =>(<AdminDashBoard backend ={this.state.backend} currentUser ={this.state.currentUser}/>)}/>
            <Route exact path='/metamask' render={() =>(<GetWallet/>)}/>
          </Switch>
        </BrowserRouter>
      );
     
    }
  }
  

export default App;
