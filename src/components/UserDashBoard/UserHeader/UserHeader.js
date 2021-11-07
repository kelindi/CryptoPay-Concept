import React, { Component } from 'react';
import SendPopUp from './PopUps/SendPopUp'; 
import RequestPopUp from './PopUps/RequestPopUp';
import SplitPopUp from './PopUps/SplitPopUp';

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
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
            <div className = "grid grid-flow-col auto-cols-min h-1/5 bg-blue-100">
                {/* 1) placeholder profile photo which can be modified by user
                    2) Display Name
                    3) Display Account Balance 
                    4) 3 buttons:
                        - Send
                        - Request
                        - Split*/}
                {/* <img className='UserProfilePhoto' src={this.state.pF} alt="Profile Photo"/> */}
                <div className='w-48 h-48 ml-8'>
                    <img className='rounded-full h-2/3 w-2/3 m-4 flex items-center justify-center' src={this.state.pf} alt="Profile Photo"/>
                </div>
                
                <div className='text-left w-96 mr-32'>
                    {/* Info */}
                    <p className='pt-5 text-3xl'><b>{this.state.firstName} {this.state.lastName}</b></p>
                    <p className='pt-4 text-xl'><b>Balance:</b></p>
                    <p className='text-2xl'><b>{this.state.balance}</b></p>
                </div>

                <div className='pt-4 ml-72 text-center max-w-xl'>
                    {/* Buttons */}
                    <button className='w-24 h-10 mb-1 bg-blue-300 hover:bg-green-200 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.sendPopOn}><b>Send</b></button><br></br>
                    <button className='w-24 h-10 mb-1 bg-blue-300 hover:bg-green-200 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.reqPop}><b>Request</b></button><br></br>
                    <button className='w-24 h-10 mb-1 bg-blue-300 hover:bg-green-200 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
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