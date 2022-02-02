import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Backend from "./classes/Backend";
import UserDashBoard from "./components/UserDashBoard/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import detectEthereumProvider from "@metamask/detect-provider";
import GetWallet from "./components/GetWallet.js";
import { uuid } from "uuidv4";
import cPayRequest from "./CryptoPayClient";
import User from "./classes/User";
import { ethers } from "ethers";
import Admin from "./classes/Admin";
import { Redirect } from "react-router";
import { checkSession } from "./CheckSession";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userData: null,
      history: browserHistory,
    };
  }

  componentDidMount() {
    console.log("checking if user has logged in");
    checkSession(this);
    // deployment URL
    // const url = `https://crypt0pay.herokuapp.com/users/check-session`
    // local URL
  }
  // .then(res => {
  //     if (res.status === 200) {
  //         return res.json();
  //     }
  // })
  // .then(json => {
  //     if (json && json.currentUser) {
  //         this.setState({ currentUser: json.currentUser });
  //     }
  // })

  updateData = async () => {
    await this.state.currentUser.updateData();
    await this.setState({ currentUser: this.state.currentUser });
  };

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
    console.log(this.state.currentUser);
  };

  setUserData = (userData) => {
    this.setState({ userData: userData });
  };

  useApi = async (request, route, body) => {
    const response = await fetch(route, {
      method: request,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const status = response.status;
    if (status !== 200) {
      return { status: status, data: [] };
    }
    const data = await response.json();
    return { status: status, data: data };
  };

  connectWallet = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.enable(); //connect Metamask
        const obj = {
          connectedStatus: true,
          status: "",
          address: address,
        };
        return obj;
      } catch (error) {
        return {
          connectedStatus: false,
          status: "Connect to Metamask using the button on the top right.",
        };
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "You must install Metamask into your browser: https://metamask.io/download.html",
      };
    }
  };

  render() {
    return (
      <Router history={browserHistory}>
        <Route
          exact
          path={["/", "/login"]}
          render={() => (
            <div className="app">
              <Login
                connectWallet={this.connectWallet}
                setCurrentUser={this.setCurrentUser}
                useApi={this.useApi}
                setUserData={this.setUserData}
                history={browserHistory}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/userDashBoard"
          render={() => (
            <div className="app">
              {/* Different componenets rendered depending on if someone is logged in. */}
              {/* {!this.state.currentUser ? <Login
                connectWallet={this.connectWallet}
                setCurrentUser={this.setCurrentUser}
                useApi={this.useApi}
                setUserData={this.setUserData}
                /> :  */}
              <UserDashBoard
                currentUser={this.state.currentUser}
                useApi={this.useApi}
                userData={this.state.currentUser}
                updateData={this.updateData}
                connectWallet={this.connectWallet}
                history={browserHistory}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/register"
          render={() => <Register useApi={this.useApi} />}
        />

        <Route
          exact
          path="/adminDashBoard"
          render={() => <AdminDashBoard currentUser={this.state.userData} />}
        />
        <Route exact path="/metamask" render={() => <GetWallet />} />
      </Router>
    );
  }
}

export default App;
