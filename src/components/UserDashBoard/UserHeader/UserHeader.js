import React, { Component } from 'react';
import SendPopUp from './SendPopUp'; 
import RequestPopUp from './RequestPopUp'
import SplitPopUp from './SplitPopUp';

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            userName: this.props.currentUser.userName,
            pf: this.props.currentUser.profilePicture,
            balance: this.props.currentUser.currentAccountBalance,
            currentUser: this.props.currentUser,
            // used backend.js
            sendOpen: false,
            requestOpen: false,
            splitOpen: false,
        } 
        this.changeBalance = this.changeBalance.bind(this)
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

    reqPop = () => {
        this.setState({
            requestOpen: !this.state.requestOpen,
        });
    }

    splitPop = () => {
        this.setState({
            splitOpen: !this.state.splitOpen,
        });
    }

    changeBalance(amount) {
        this.setState({balance: this.state.balance-amount})
    }


    render() {
        
        return (
            <div className = "flex flex-row h-1/5 bg-blue-100">
                {/* 1) placeholder profile photo which can be modified by user
                    2) Display Name
                    3) Display Account Balance 
                    4) 3 buttons:
                        - Send
                        - Request
                        - Split*/}
                {/* <img className='UserProfilePhoto' src={this.state.pF} alt="Profile Photo"/> */}
                <div className='w-48 h-48 flex-shrink-0'>
                    <img className='rounded-full h-2/3 w-2/3 m-4' src={this.state.pf} alt="Profile Photo"/>
                </div>
                
                <div className='text-left flex flex-col flex-shrink-0'>
                    {/* Info */}
                    <div className = "py-2 text-4xl"><b>{this.state.userName}</b></div>
                    <div className='py-2 text-2xl'>{this.state.firstName} {this.state.lastName}</div>
                    <div className='py-2 text-xl'><b>Balance:</b>{this.state.balance}</div>

                </div>

                <div className='ml-auto px-10 my-1'>
                    {/* Buttons */}
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.sendPopOn}><b>Send</b></button><br></br>
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.reqPop}><b>Request</b></button><br></br>
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.splitPop}><b>Split</b></button>
                </div>
                {this.state.sendOpen ? <SendPopUp currentUser = {this.state.currentUser} 
                                                  updateBalance = {this.changeBalance} 
                                                  minimizeSend={this.sendPopOff}
                                                  maximizeSend={this.sendPopOn} /> : null}
                {this.state.requestOpen ? <RequestPopUp toggle={this.reqPop} /> : null}
                {this.state.splitOpen ? <SplitPopUp toggle={this.splitPop} /> : null}
            </div>
          );
    }
}
 
export default UserHeader;