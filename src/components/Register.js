import React, { Component } from 'react';
import Backend, { addUser } from "./../classes/Backend";
import { Redirect } from 'react-router';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            userName: '',
            email:'',
            password:'',
            rePassword: '',
            passwordCheck: 'true',
            failedAttempt: false,
            // loginDB: {"User":"Test"} // have this be a remote DB called in handleLogin in phase 2
            loginDB: {'user':'user','user2':'user2','user3':'user3','user4':'user4','admin':'admin'},
            redirectUser: false
            }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this)

        
    }

    handleRePasswordChange(event){
        this.setState({rePassword: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }
    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleUsernameChange(event) {
        this.setState({userName: event.target.value});
    }
    handleUsernameChange(event) {
        this.setState({userName: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password:event.target.value})
    }

    handleLogin(event){
        
        //insert actual data base here in phase 2 to check for password

        if(this.state.password != this.state.rePassword){
            console.log('bad password')
            // return
            this.setState({failedAttempt: true})
            return
        }
        else{
            this.props.backend.addUser(this.state.firstName, this.state.lastName, this.state.userName, this.state.password)
            // setting state to true to enable redirecting to login page
            this.setState({redirectUser: true})
            console.log(this.props.backend.loginDB)
            return
        }

        // if(this.state.userName in log)


        

        

        
    }

    render() {
        //redirecting to login page
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

                            <form onSubmit={this.handleLogin} className="mt-10">
                                <div className = "flex gap-4"> 
                                    <div className = "">
                                        <input value = {this.state.firstName} onChange={this.handleFirstNameChange} placeholder="First Name" className={"mt-1 w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none flex pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>
                                    </div>
                                    <div className = "">
                                        <input value = {this.state.lastName} onChange={this.handleLastNameChange} placeholder="Last Name" className={"mt-1 w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <input value = {this.state.userName} onChange={this.handleUsernameChange} placeholder="Username" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>
                                </div>
                                
                                <div className="mt-5">
                                    <input value = {this.state.email} onChange={this.handleEmailChange} type = "email" placeholder="Email" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>
                                </div>

                                <div className="mt-5">                
                                    <input value = {this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>                           
                                </div>
                                <div className="mt-5">                
                                    <input value = {this.state.rePassword} onChange={this.handleRePasswordChange} type="password" placeholder="Reenter Password" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>                           
                                </div>

                                <label className={"text-red-500 " + (this.state.failedAttempt ? "" : "hidden")}>
                                That username or password is incorrect.</label>
                                

                                {/* Add forgot password and remember me later */}
                                <div className="mt-7 flex hidden">
                                    
                                    <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                        <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none" name="remember"/>
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                    
                                    <div className="w-full text-right">     
                                            <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                                forgot password?
                                            </a>                                  
                                    </div>

                                </div>
                    
                                <div className="mt-7">
                                    <input type = "submit" value= "Register" className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    {/* <input type = "button" value= "Register" className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" onClick={this.handleLogin}> */}
                                    </input>
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