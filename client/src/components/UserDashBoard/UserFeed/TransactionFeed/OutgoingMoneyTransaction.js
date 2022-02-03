import React, { Component } from 'react';
import cPayRequest from "../../../../CryptoPayClient";

class OutgoingMoneyRequest extends Component{
    constructor(props){
        super(props);
    }

    handleRescind = async (request) => {
        // deleting outgoing money request from database
        await request.deleteRequest()
        this.props.updateUser()
    }
    
    render(){
        const {request, changeOutgoingMoneyRequests, global} = this.props
        
        return(
        <div className="h-14 flex items-center px-4 py-3 bg-gray-800 rounded-xl my-2">
          <img className='h-10' src={"https://avatars.dicebear.com/api/bottts/" + request.destinationUser + ".png"}></img>
          <p className="text-custom-100 text-sm mx-2 w-28">
            <span className="font-bold block">
            <strong className = "uppercase">{request.destinationUser}</strong>
            </span>
            <div>
            <div className="font-light text-xs">
              <b className=''>Sent:</b> {request.date.slice(0, 10)}{" "}
            </div>
            </div>
          </p>
          
          <div className="px-1 float-left font-light text-lg flex flex-row text-center w-16 h-full items-center">
            <img class="h-full w-5 mx-2 inline" alt="ETH" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="24"></img>
              {request.amount}
            </div>
          <div className="ml-auto text-xs">
            <button
              className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full"
              onClick={() => this.handleRescind(request)}>
              Cancel
            </button>
            </div>
        </div>
        )
    }
}

export default OutgoingMoneyRequest