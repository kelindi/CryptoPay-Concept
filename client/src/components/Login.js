import React, { Component } from "react";
import { Redirect } from "react-router";
import Admin from "../classes/Admin";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import User from "../classes/User";
import { async } from "q";
import {withRouter} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      failedAttempt: false,
      redirectUser: false,
      redirectAdmin: false,
      walletNotConnected: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  handleUsernameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin = async (event) => {
    event.preventDefault();

    let login = {
      userName: this.state.userName.toLowerCase(),
      password: this.state.password,
    };


    const { status, data } = await this.props.useApi(
      "post",
      "/api/login",
      login
    );
    if (status === 200) {
      if (data.currentUser !== undefined) {
        if (data.isAdmin) {
          // await this.props.setCurrentUser(data.currentUser);
          await this.setUpAdminData();
          // this.setState({ redirectAdmin: true });
          this.props.history.push("/adminDashBoard");
          return;
        }

        await this.props.setCurrentUser(data.currentUser);
        await this.setUpUserData();

        // this.setState({ redirectUser: true });
        return;
      }
    }
    this.setState({ failedAttempt: true });
  };

  setUpAdminData = async() => {
    let adminData = {};
    const { status, data } = await this.props.useApi(
      "get",
      "/api/user/" + this.state.userName
    );
    if (status === 200){
      adminData.firstName = data.firstName;
      adminData.lastName = data.lastName;
    }

    let admin = new Admin(
      adminData.firstName,
      adminData.lastName
    );

    await admin.updateAdminData();
    console.log(admin)
    await this.props.setCurrentUser(admin);
    await this.props.setUserData(admin);
  };

  setUpUserData = async () => {
    let userData = {};
    const { status, data } = await this.props.useApi(
      "get",
      "/api/user/" + this.state.userName
    );
    if (status === 200) {
      userData.isAdmin = data.isAdmin;
      userData.userName = data.userName;
      userData.firstName = data.firstName;
      userData.lastName = data.lastName;

      // userData.profilePhoto = data.profilePhoto
    }

    let user = new User(
      userData.firstName,
      userData.lastName,
      userData.userName,
    );

    await user.updateData();
    await this.props.setCurrentUser(user);
    await this.props.setUserData(user);
    this.props.history.push("/userDashBoard");
  };

  render() {
    // if this.state.redirect is true, redirect to this path
    if (this.state.redirectUser) {
      console.log("going to user")
      return <Redirect push to="/userDashBoard" />;
    }
    if(this.props.sessionStatus === true){
      return <Redirect push to="/userDashBoard" />;
    }
      if (this.state.redirectAdmin) {
      console.log("going to admin")
      return <Redirect push to="/adminDashBoard" />;
    }
    return (
      <div className="font-serif">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-900">
          <div className="text-8xl font-mono my-4 text-gray-200">CryptoPay</div>
          <div className="relative sm:max-w-sm w-full">
            <div className="relative w-full px-6 py-4">
              <form
                className="mt-10"
                onSubmit={(e) => {
                  return false;
                }}
              >
                <div>
                  <input
                    value={this.state.userName}
                    onChange={this.handleUsernameChange}
                    placeholder="Username"
                    className={
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-2xl hover:bg-warm-gray-300 focus:bg-bg-warm-gray-300 focus:ring-0 outline-none pl-5 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 " +
                      (this.state.failedAttempt
                        ? "border-red-500 border"
                        : "border-none")
                    }
                  />
                </div>

                <div className="mt-7">
                  <input
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    type="password"
                    placeholder="Password"
                    className={
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-2xl hover:bg-warm-gray-300 focus:bg-bg-warm-gray-300 focus:ring-0 outline-none pl-5 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 " +
                      (this.state.failedAttempt
                        ? "border-red-500 border"
                        : "border-none")
                    }
                  />
                </div>

                <label
                  className={
                    "text-red-500 " + (this.state.failedAttempt ? "" : "hidden")
                  }
                >
                  That username or password is incorrect.
                </label>

                <div className="mt-7">
                  <button
                    onClick={this.handleLogin}
                    className="bg-warm-gray-500 hover:bg-warm-gray-400 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2 text-gray-300">
                      Don't have an account?
                    </label>
                    <Link
                      className="text-blue-gray-400 hover:text-blue-gray-200 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      to={"./Register"}
                    >
                      Create one!
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
