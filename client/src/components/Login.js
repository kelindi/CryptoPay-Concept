import React, { Component } from "react";
import { Redirect } from "react-router";
import Admin from "../classes/Admin";
import { Link } from "react-router-dom";
import {ethers} from 'ethers';

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

    const wallet = await this.props.connectWallet();

    //check that wallet is connected if not redirect to get metamask page
    if (wallet.connectedStatus === false) {
      this.setState({ walletNotConnected: true });
      return;
    }

    let login = {
        userName: this.state.userName.toLowerCase(),
        password:this.state.password
      };
    
   const{status,data} = await this.props.useApi("post", "/api/login", login)
    if (status === 200){
        if (data.currentUser !== undefined){
            await this.props.setCurrentUser(data.currentUser);
            await this.setUpUserData();
            this.setState({redirectUser: true});
            return
        }
    }
    this.setState({ failedAttempt: true });

  };

  setUpUserData = async () => {
    let userData = {}
    userData.provider = new ethers.providers.Web3Provider(window.ethereum);
    userData.signer = userData.provider.getSigner();
    userData.wallet = await userData.signer.getAddress();
    let userBalance = await userData.provider.getBalance(userData.wallet);
    userData.userBalance = ethers.utils.formatEther(userBalance);
    const { status, data } = await this.props.useApi(
      "get",
      "/api/user/"+this.state.userName
    );
    if (status === 200) {
      userData.userName = data.userName;
      userData.firstName = data.firstName;
      userData.lastName = data.lastName;
    }
    const {status2,data2} = await this.props.useApi("get", "/api/user/"+this.state.userName+"/friends");
    if (status2 === 200){
        userData.friends = data2.friends;
    }
    await this.props.setUserData(userData);
  };




  render() {
    // if this.state.redirect is true, redirect to this path
    if (this.state.redirectUser) {
      return <Redirect push to="/userDashBoard" />;
    } else if (this.state.redirectAdmin) {
      return <Redirect push to="/adminDashBoard" />;
    }
    if (this.state.walletNotConnected) {
      return <Redirect push to="/metamask" />;
    }

    return (
      <div className="font-serif">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-grey">
          <div className="text-8xl font-mono my-4">CryptoPay</div>
          <div className="relative sm:max-w-sm w-full">
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-md border">
              <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                Login
              </label>
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
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
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
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
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

                {/* Add forgot password and remember me later */}
                <div className="mt-7 flex hidden">
                  <label
                    htmlFor="remember_me"
                    className="inline-flex items-center w-full cursor-pointer"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                      name="remember"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>

                  <div className="w-full text-right">
                    <a
                      className="underline text-sm text-gray-600 hover:text-gray-900"
                      href="#"
                    >
                      forgot password?
                    </a>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    onClick={this.handleLogin}
                    className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2">Don't have an account?</label>
                    {/* <a href="/register" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Create an account!
                                        </a> */}
                    <Link
                      className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      to={"./Register"}
                    >
                      Create an account!
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

export default Login;
