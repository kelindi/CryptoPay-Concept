import React, { Component } from 'react';

class AcceptMoneyReq extends Component{
    constructor(props){
        super(props)
        this.state={
            currentUser: this.props.request.destinationUser,
            balance: this.props.request.destinationUser.currentAccountBalance,
            incomingMoneyRequests: this.props.request.destinationUser.requests
        }
    }

    render(){
        const { request, acceptRequest, cancel } = this.props

        return(
            <div className="bg-white rounded md:w-1/3 w-1/2 border shadow-lg fixed z-100 left-1/4 top-1/3">
                {/* <div className="px-4 backdrop-filter my-4">
                    Hi
                </div> */}
                <div className="rounded-t bg-blue-300 text-black ">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Confirmation of Money Transfer</span> 
                    </div>
                    <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                        <div className="text-center">
                            Are you sure you want to send {request.originUser.userName} ({request.originUser.firstName} {request.originUser.lastName}) ${request.amount}? <br/>
                            This transaction <b>cannot</b> be undone
                        </div>
                        <div className='w-1/1 mt-2 text-center'>
                        <button className='bg-green-400 hover:bg-green-300 text-black font-light py-2 px-4 rounded-xl hover:border-blue rounded'
                                onClick={() => this.props.acceptRequest(request.amount, request.originUser)}>Yes</button>
                        <button className='ml-1 bg-red-400 hover:bg-red-300 text-black font-light py-2 px-4 rounded-xl hover:border-blue rounded'>No, cancel transaction</button>
                    </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AcceptMoneyReq