import React, { Component } from 'react';
import Backend, { addUser } from "../classes/Backend";
import { Redirect } from 'react-router';

class GetWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
      
    }
}

    render() {
        //redirecting to login page
        
        return (
            <div className="flex font-serif w-screen h-screen text-center bg-gray-900 text-gray-200 text-3xl justify-center">
                <p className = "mt-64 leading-relaxed">
                    You must install Metamask on your browser: <a className = "animate-pulse underline" href="https://metamask.io/download.html">metamask.io/download.html</a>
                    <br></br>
                    If you already have Metamask installed please connect an Etheruem wallet to the App
                </p>
                <div className = "absolute top-1/2 text-black">
                <a className = "bg-warm-gray-500 hover:bg-warm-gray-400 w-full py-3 px-2 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none" href ="/">back to Login</a>
                </div>
                
            </div>
          );
    }
}
 
export default GetWallet;