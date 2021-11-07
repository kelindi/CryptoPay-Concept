import React, { Component } from 'react';
import SendPopUp from './SendPopUp'; 
import RequestPopUp from './RequestPopUp'
import SplitPopUp from './SplitPopUp';

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            firstName: this.props.global.firstName,
            lastName: this.props.global.lastName,
            userName: this.props.global.userName,
            pf: this.props.global.profilePicture,
            balance: this.props.global.userBalance,
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

    splitPopOn = () => {
        this.setState({
            splitOpen: true,
        });
    }

    splitPopOff = () => {
        this.setState({
            splitOpen: false,
        });
    }

    changeBalance(deduction) {
        const newAmount = this.props.global.userBalance - deduction
        this.props.changeUserBalance(newAmount)
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
                    <div className = "py-2 text-4xl"><b>{this.props.global.userName}</b></div>
                    <div className='py-2 text-2xl'>{this.state.firstName} {this.props.global.lastName}</div>
                    <div className='py-2 text-xl'><b>Balance:</b>{this.props.global.userBalance}</div>

                </div>

                <div className='ml-auto px-10 my-1'>
                    {/* Buttons */}
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.sendPopOn}><b>Send</b></button><br></br>
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.reqPop}><b>Request</b></button><br></br>
                    <button className='w-24 h-10 my-1 bg-blue-300 hover:bg-green-200 text-black font-bold rounded-xl hover:border-blue rounded' 
                            onClick={this.splitPopOn}><b>Split</b></button>
                </div>
                {this.state.sendOpen ? <SendPopUp currentUser={this.state.currentUser} 
                                                friendsList = {this.props.global.friendsList}
                                                  updateBalance={this.changeBalance} 
                                                  minimizeSend={this.sendPopOff}
                                                  maximizeSend={this.sendPopOn} /> : null}
                {this.state.requestOpen ? <RequestPopUp toggle={this.reqPop} /> : null}
                {this.state.splitOpen ? <SplitPopUp currentUser={this.state.currentUser} 
                                                //   updateBalance={this.changeBalance} 
                                                  minimizeSplit={this.splitPopOff}
                                                  maximizeSplit={this.splitPopOn} /> : null}
            </div>
          );
    }
}
 
export default UserHeader;