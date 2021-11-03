import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password:'',
            failedAttempt: false,
            redirect: false
            }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this)

        
    }
    

    handleUsernameChange(event) {
        this.setState({userName: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password:event.target.value})
    }

    handleLogin(event){
        event.preventDefault()
        //insert actual data base here in phase 2 to check for password
        if(this.props.backend.loginDB[this.state.userName]===this.state.password){
            const token = this.props.backend.tokenDB[this.state.userName];
            const currentUser = this.props.backend.userDB[token];
            this.props.setCurrentUser(currentUser)
            

            //set the redirect to true to enable the redirect
            this.setState({redirect: true});
            return
        }


        this.setState({failedAttempt: true})


    }

    render() {
        // if this.state.redirect is true, redirect to this path
        if (this.state.redirect) {
            return <Redirect push to="/userDashBoard" />;
       }

        return (
            <div className="font-sans">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-grey">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-md border">
                            <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                                Login
                            </label>
                            <form className="mt-10" onSubmit = {(e) => {return false}}>

                                <div>
                                    <input value = {this.state.userName} onChange={this.handleUsernameChange} placeholder="Username" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>
                                </div>
                    
                                <div className="mt-7">                
                                    <input value = {this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" className={"mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 outline-none pl-5 " + (this.state.failedAttempt ? "border-red-500 border" : "border-none")}/>                           
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
                                    <button onClick = {this.handleLogin} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Login
                                    </button>
                                </div>   


                                <div className="mt-7">
                                    <div className="flex justify-center items-center">
                                        <label className="mr-2">Don't have an account?</label>
                                        <a href="/register" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Create an account!
                                        </a>
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