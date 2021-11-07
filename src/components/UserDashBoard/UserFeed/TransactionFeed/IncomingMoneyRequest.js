import React, { Component } from 'react';
import AcceptMoneyReq from '../TransactionFeed/AcceptMoneyReq'

class IncomingMoneyRequest extends Component{
    constructor(props){
        super(props)   
        this.state = {
            balance: this.props.request.destinationUser.currentAccountBalance,
            incomingRequests: this.props.request.destinationUser.requests
        }
    }

    sendPopOn = () => {
        this.setState({
            sendOpen: true,
        });
    }

    sendPopOff = () => {
        this.setState({
            sendOpen: false,
        });
    }

    handleAccept = (amount, requestee) => {
        const newRequests = this.state.incomingRequests.filter(r => {
            return r !== requestee
        })
        const newBalance = this.state.balance - amount
        this.setState({
            balance: newBalance
        },
            this.setState({
                incomingRequests: newRequests
            })
            )
        this.props.changeIncomingMoneyRequests(newRequests)
        this.props.changeUserBalance(newBalance)
    }
    // changeBalance(amount) {
    //     this.setState({balance: this.state.balance-amount})
    // }

    /*
        On accept, 
            set state for curr accepted req
            Set state for showing pop up
            set state for show popup to off
        On cancel,
            set state for show popup to off
    */

    render(){
        const {request, changeIncomingMoneyRequests, changeUserBalance} = this.props

        return(
            <div className="relative rounded-2xl w-full h-20 bg-gray-100 mt-2">
                <div className="absolute float-left rounded-full h-20 w-20">
                    <img className="float-left absolute rounded-full h-20 w-20 flex px-3 py-3 items-center
                    justify-center" src={request.originUser.profilePicture}></img>
                </div>
                <div className="relative float-right top-2 w-10/12">
                    <div className="float-left tracking-wide text-center"><b>{request.originUser.firstName}</b> {request.originUser.lastName}     <small>({request.originUser.userName})</small></div> <br/>
                    <div className="float-left">
                        <div className="px-1 float-left font-light">Amount:{request.amount} </div>
                        <div className="px-1 font-light float-right"> Sent on {request.date} </div>
                    </div>
                    <div className="float-right">
                        <button className="float-left bg-green-400 opacity-75 w-1/2 py-1 rounded-md"
                                onClick={this.sendPopOn}>Accept</button>
                        <button className="float-right bg-red-600 opacity-80 rounded-md w-1/2 py-1">Reject</button>
                    </div>
                </div>
                {this.state.sendOpen ? <AcceptMoneyReq request={request} 
                                                       acceptRequest={this.handleAccept}
                                                       minimizeSend={this.sendPopOff} /> : null}
                
            </div>
        )
    }
}

export default IncomingMoneyRequest