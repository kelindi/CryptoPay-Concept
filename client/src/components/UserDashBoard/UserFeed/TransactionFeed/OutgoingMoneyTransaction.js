import React, { Component } from 'react';

class OutgoingMoneyRequest extends Component{
    constructor(props){
        super(props);
    }

    handleRescind = (request) => {
        const newRequests = this.props.global.sentMoneyRequests.filter(r => {
            return r !== request
        })
        this.setState({
            incomingRequests: newRequests
        })
        this.props.changeOutgoingMoneyRequests(newRequests)
    }
    
    render(){
        const {request, changeOutgoingMoneyRequests, global} = this.props

        return(
        <div className="h-12 flex items-center px-4 py-3 border-b bg-gray-100 rounded-xl shadow-md my-2">
          <img
            className="h-8 w-8 rounded-full object-cover mx-1"
            src={request.originUser.profilePicture}
          />
          <p className="text-gray-600 text-sm mx-2">
            <span className="font-bold block">
            <strong className = "uppercase">{request.destinationUser} </strong>
            {/* <span>{request.originUser.firstName}</span>{" "}
            <span>{request.originUser.lastName}</span> */} {/* Try adding server calls for this later */}
            </span>
            
            <div className="px-1 float-left font-light">
              <strong>Amount:</strong>{request.amount}{" "}
            </div>
            <div className="px-1 font-light float-right">
              {" "}
              Sent on {request.date.slice(0, 10)}{" "}
            </div>
          </p>
          <div className="ml-auto text-xs">
            <button
              className="mx-1 px-2 py-1 bg-red-500 rounded-3xl text-white shadow-lg"
              onClick={() => this.handleRescind(request)}>
              Rescind
            </button>
            </div>
        </div>
        )
    }
}

export default OutgoingMoneyRequest