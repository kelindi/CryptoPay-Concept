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
    // const { changeSentMoneyRequests } = this.props; // what does this do?

    return (
      <div className="flex flex-row h-52 bg-gray-900 mt-2 rounded-xl shadow-2xl mx-4 text-custom-100">
        <div className="w-48 h-48 flex-shrink-0 bg-red">
          <img
            className="shadow-2xl rounded-full h-2/3 w-2/3 m-4 p-4 bg-custom-100"
            src={this.props.global.profilePicture}
            alt="Profile Photo"
            onMouseEnter={()=> this.setIsShown(true)}
            onMouseLeave={()=> this.setIsShown(false)}
          />
        </div>
        
        
        <div className="text-left flex flex-col flex-shrink-0">
          {/* Info */}
          <div className="py-2 text-4xl">
            <b>{this.props.global.userName}</b>
          </div>
          <div className="py-2 text-2xl">
            {this.props.global.firstName} {this.props.global.lastName}
          </div>
          <div className="py-2 text-xl">
          <img class="h-full w-8 mr-2 inline" alt="ETH" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="24"></img>
            {parseFloat(this.props.global.userBalance).toFixed(4)}
          </div>
        </div>

        <div className="ml-auto px-10 my-1 text-gray-900 flex-col flex items-center justify-center">
          {/* Buttons */}
          <button
            className="w-24 h-10 bg-warm-gray-400 hover:bg-warm-gray-500 hover:text-custom-100 rounded-3xl shadow-xl"
            onClick={this.sendPopOn}
          >
            Send
          </button>
          <br></br>
          <button
            className="w-24 h-10 bg-warm-gray-400 rounded-3xl shadow-xl hover:bg-warm-gray-500 hover:text-custom-100"
            onClick={this.reqPop}
          >
            Request
          </button>
          <br></br>
          {/* <button
            className="w-24 h-10 my-1 bg-blue-500 rounded-3xl shadow-lg hover:bg-green-500"
            onClick={this.splitPopOn}
          >
            Split
          </button> */}
        </div>
        {this.state.sendOpen ? (
          <SendPopUp
            sendMoney={this.props.sendMoney}
            currentUser={this.props.currentUser}
            friendsList={this.props.global.friendsList}
            updateBalance={this.changeBalance}
            minimizeSend={this.sendPopOff}
            maximizeSend={this.sendPopOn}
            global={this.props.global}
            useApi={this.props.useApi}
            updateUserdata={this.props.updateUserdata}
          />
        ) : null}
        {this.state.requestOpen ? (
          <RequestPopUp
            currentUser={this.state.currentUser}
            toggle={this.reqPop}
            friendsList={this.props.global.friendsList}
            minimizeSend={this.reqPopOff}
            maximizeSend={this.sendPopOn}
            changeSentMoneyRequests={this.props.changeSentMoneyRequests}
            global={this.props.global}
            useApi={this.props.useApi}
            updateData={this.props.updateData}
          />
        ) : null}
        {this.state.splitOpen ? (
          <SplitPopUp
            sendMoney={this.props.sendMoney}
            currentUser={this.state.currentUser}
            friendsList={this.props.global.friendsList}
            //   updateBalance={this.changeBalance}
            minimizeSplit={this.splitPopOff}
            updateBalance={this.changeBalance}
            maximizeSplit={this.splitPopOn}
            global={this.props.global}
            useApi={this.props.useApi}
          />
        ) : null}
      </div>
    );
  }
}

export default UserHeader;
