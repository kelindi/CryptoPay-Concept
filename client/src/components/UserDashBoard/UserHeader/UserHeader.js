import React, { Component } from "react";
import SendPopUp from "./SendPopUp";
import RequestPopUp from "./RequestPopUp";
import SplitPopUp from "./SplitPopUp";
import PFUploadPopUp from "./PFUploadPopUp"

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
      isShown: false,
      pfUpload: false,
    };
  }
  
  sendPopOn = () => {
    this.setState({
      sendOpen: true,
    });
  };

  sendPopOff = () => {
    this.setState({
      sendOpen: false,
    });
  };

  reqPop = () => {
    this.setState({
      requestOpen: !this.state.requestOpen,
    });
  };

  reqPopOff = () => {
    this.setState({
      requestOpen: false,
    });
  };

  splitPopOn = () => {
    this.setState({
      splitOpen: true,
    });
  };

  splitPopOff = () => {
    this.setState({
      splitOpen: false,
    });
  };

  setIsShown = (val) => {
    // console.log("Hello")
    this.setState({
      isShown: val,
    })
  }

  changeBalance = (deduction) => {
    const newAmount = this.props.global.userBalance - deduction;
    this.props.changeUserBalance(newAmount);
  }

  PFUploadOn = () => {
    // alert('clicked!')
    this.setState({
      pfUpload: true
    })
  }

  PFUploadOff = () => {
    // alert('clicked!')
    this.setState({
      pfUpload: false
    })
  }

  render() {
    const { changeSentMoneyRequests } = this.props;

    return (
      <div className="flex flex-row h-1/5 bg-white mt-2 mb-2 rounded-xl shadow-2xl">
        {/* 1) placeholder profile photo which can be modified by user
                    2) Display Name
                    3) Display Account Balance 
                    4) 3 buttons:
                        - Send
                        - Request
                        - Split*/}
        {/* <img className='UserProfilePhoto' src={this.state.pF} alt="Profile Photo"/> */}
        <div className="w-48 h-48 flex-shrink-0 bg-red">
          <img
            className="shadow-2xl rounded-full h-2/3 w-2/3 m-4 hover:opacity-50"
            src={this.state.pf} 
            alt="Profile Photo"
            onMouseEnter={()=> this.setIsShown(true)}
            onMouseLeave={()=> this.setIsShown(false)}
          />
        </div>
        {this.state.isShown? (
          <div className='flex flex-col rounded w-auto h-auto fixed z-100 left-8 top-20'
               onMouseEnter={()=>this.setIsShown(true)}
               onMouseLeave={()=> this.setIsShown(false)}
               onClick={this.PFUploadOn}>
            {/* Change Profile Picture */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
        ): null}
        {this.state.pfUpload? (
          <PFUploadPopUp
          currentUser={this.state.currentUser}
          friendsList={this.props.global.friendsList}
          updateBalance={this.changeBalance}
          minimizeUpload={this.PFUploadOff}
          maximizeUpload={this.PFUploadOn}
        />
        ): null}

        <div className="text-left flex flex-col flex-shrink-0">
          {/* Info */}
          <div className="py-2 text-4xl">
            <b>{this.props.global.userName}</b>
          </div>
          <div className="py-2 text-2xl">
            {this.props.global.firstName} {this.props.global.lastName}
          </div>
          <div className="py-2 text-xl">
            <b>Balance:</b>
            {this.props.global.userBalance}
          </div>
        </div>

        <div className="ml-auto px-10 my-1 text-white">
          {/* Buttons */}
          <button
            className="w-24 h-10 my-1 bg-blue-500 hover:bg-green-500 rounded-3xl shadow-lg"
            onClick={this.sendPopOn}
          >
            Send
          </button>
          <br></br>
          <button
            className="w-24 h-10 my-1 bg-blue-500 rounded-3xl shadow-lg hover:bg-green-500"
            onClick={this.reqPop}
          >
            Request
          </button>
          <br></br>
          <button
            className="w-24 h-10 my-1 bg-blue-500 rounded-3xl shadow-lg hover:bg-green-500"
            onClick={this.splitPopOn}
          >
            Split
          </button>
        </div>
        {this.state.sendOpen ? (
          <SendPopUp
            currentUser={this.state.currentUser}
            friendsList={this.props.global.friendsList}
            updateBalance={this.changeBalance}
            minimizeSend={this.sendPopOff}
            maximizeSend={this.sendPopOn}
            global={this.props.global}
          />
        ) : null}
        {this.state.requestOpen ? (
          <RequestPopUp
            toggle={this.reqPop}
            friendsList={this.props.global.friendsList}
            minimizeSend={this.reqPopOff}
            maximizeSend={this.sendPopOn}
            changeSentMoneyRequests={this.props.changeSentMoneyRequests}
            global={this.props.global}
          />
        ) : null}
        {this.state.splitOpen ? (
          <SplitPopUp
            currentUser={this.state.currentUser}
            friendsList={this.props.global.friendsList}
            //   updateBalance={this.changeBalance}
            minimizeSplit={this.splitPopOff}
            updateBalance={this.changeBalance}
            maximizeSplit={this.splitPopOn}
            global={this.props.global}
          />
        ) : null}
      </div>
    );
  }
}

export default UserHeader;
