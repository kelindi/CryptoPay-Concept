import React, { Component } from "react";
import Backend, { addUser } from "../classes/Backend";
import { Redirect } from "react-router";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      passwordCheck: "true",
      failedAttempt: false,
      // loginDB: {"User":"Test"} // have this be a remote DB called in handleLogin in phase 2
      loginDB: {
        user: "user",
        user2: "user2",
        user3: "user3",
        user4: "user4",
        admin: "admin",
      },
      redirectUser: false,
      invalidUserName: false,
      invalidPassword: false,
      invalidRePassword: false,
      invalidFirstName: false,
      invalidLastName: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRePasswordChange(event) {
    this.setState({ rePassword: event.target.value, invalidRePassword: false });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value, invalidFirstName: false });
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value, invalidLastName: false });
  }

  handleUsernameChange(event) {
    this.setState({ userName: event.target.value });
  }
  handleUsernameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value, invalidPassword: false });
  }

  handleLogin = async (event) => {
    event.preventDefault();
    const { firstName, lastName, userName, password, rePassword } = this.state;

    let shouldReturn = false;
    //check if password is valid
    if (
      !(
        password.match(/[a-z]/g) &&
        password.match(/[A-Z]/g) &&
        password.match(/[0-9]/g) &&
        password.match(/[^a-zA-Z\d]/g) &&
        password.length >= 8
      )
    ) {
      this.setState({ invalidPassword: true });
      shouldReturn = true;
    }

    //check if password and repassword are the same
    if (password !== rePassword) {
      this.setState({ invalidRePassword: true });
      shouldReturn = true;
    }

    //check if firstName is empty
    if (firstName === "") {
      this.setState({ invalidFirstName: true });
      shouldReturn = true;
    }
    //check if lastName is empty
    if (lastName === "") {
      this.setState({ invalidLastName: true });
      shouldReturn = true;
    }
    // check if username is empty
    if (userName === "") {
        this.setState({ invalidUserName: true });
        shouldReturn = true;
      }

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName.toLowerCase(),
      password:password
    };

    const {status, data} = await this.props.useApi("post","/api/register", newUser);
    switch (status) {
      case 200:
        this.setState({ redirectUser: true });
        console.log("Successfully registered");
        break;
      case 304:
        this.setState({ invalidUserName: true });
        console.log("Username already exists");
        break;
      default:
        console.log("could not register");
    
    if (shouldReturn) {
        return;
      }
    return;
  };
};

  render() {
    // redirecting to login page
    if (this.state.redirectUser) {
        return <Redirect push to="/" />;
    }
    return (
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-grey">
          <div className="relative sm:max-w-sm w-full">
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-md border">
              <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                Register
              </label>

              <form
                onSubmit={(e) => {
                  return false;
                }}
                className="mt-10"
              >
                <div className="flex gap-4">
                  <div className="">
                    <input
                      value={this.state.firstName}
                      onChange={this.handleFirstNameChange}
                      placeholder="First Name"
                      className={
                        "mt-1 w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none flex pl-5 " +
                        (this.state.invalidFirstName
                          ? "border-red-500 border"
                          : "border-none")
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                      placeholder="Last Name"
                      className={
                        "mt-1 w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
                        (this.state.invalidLastName
                          ? "border-red-500 border"
                          : "border-none")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    for="userName"
                    className={
                      "text-red-500 " +
                      (this.state.invalidUserName ? "" : "hidden")
                    }
                  >
                    That username is taken or invalid.
                  </label>
                  <input
                    id="userName"
                    value={this.state.userName}
                    onChange={this.handleUsernameChange}
                    placeholder="Username"
                    className={
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
                      (this.state.invalidUserName
                        ? "border-red-500 border"
                        : "border-none")
                    }
                  />
                </div>

                <div className="mt-5">
                  <input
                    id="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    type="password"
                    placeholder="Password"
                    className={
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
                      (this.state.invalidPassword
                        ? "border-red-500 border"
                        : "border-none")
                    }
                  />
                  <label
                    for="password"
                    className={
                      "text-red-500 " +
                      (this.state.invalidPassword ? "" : "hidden")
                    }
                  >
                    <div>Password needs to have:</div>
                    <ul>
                      <li>At least 1 uppercase character.</li>
                      <li>At least 1 lowercase character.</li>
                      <li>At least 1 digit.</li>
                      <li>At least 1 special character.</li>
                      <li>A minimum 8 characters.</li>
                    </ul>
                  </label>
                </div>
                <div className="mt-5">
                  <label
                    for="rePassword"
                    className={
                      "text-red-500 " +
                      (this.state.invalidRePassword ? "" : "hidden")
                    }
                  >
                    Passwords must match
                  </label>
                  <input
                    id="rePassword"
                    value={this.state.rePassword}
                    onChange={this.handleRePasswordChange}
                    type="password"
                    placeholder="Reenter Password"
                    className={
                      "mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " +
                      (this.state.invalidRePassword
                        ? "border-red-500 border"
                        : "border-none")
                    }
                  />
                </div>

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
                    type="button"
                    className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    onClick={this.handleLogin}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
