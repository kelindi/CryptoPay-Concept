import "./App.css";
import { Route, Switch, BrowserRouter, Router } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Backend from "./classes/Backend";
import UserDashBoard from "./components/UserDashBoard/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import detectEthereumProvider from "@metamask/detect-provider";
import GetWallet from "./components/GetWallet.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: new Backend(),
      currentUser: null,
      userData: null,
    };
  }

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
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
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                connectWallet={this.connectWallet}
                backend={this.state.backend}
                setCurrentUser={this.setCurrentUser}
                useApi={this.useApi}
                setUserData={this.setUserData}
              />
            )}
          />

          <Route
            exact
            path="/register"
            render={() => (
              <Register backend={this.state.backend} useApi={this.useApi} />
            )}
          />

          <Route
            exact
            path="/userDashBoard"
            render={() => (
              <UserDashBoard
                backend={this.state.backend}
                currentUser={this.state.currentUser}
                testUser={this.state.backend.user1}
                useApi={this.useApi}
                userData={this.state.userData}
              />
            )}
          />

          <Route
            exact
            path="/adminDashBoard"
            render={() => (
              <AdminDashBoard
                backend={this.state.backend}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route exact path="/metamask" render={() => <GetWallet />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
