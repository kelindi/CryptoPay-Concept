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
            <div className="font-sans">
                Get metamask
            </div>
          );
    }
}
 
export default GetWallet;