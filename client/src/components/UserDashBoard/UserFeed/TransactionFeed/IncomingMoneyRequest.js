import React, { Component } from "react";
import AcceptMoneyReq from "./AcceptMoneyReq";
import cPayRequest from "../../../../CryptoPayClient";
import { async } from "q";

class IncomingMoneyRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // balance: this.props.request.destinationUser.currentAccountBalance,
      // incomingRequests: this.props.request.destinationUser.requests
      incomingRequests: this.props.user.requests,
      balance: this.props.global.userBalance,
      user: this.props.user,
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

  handleAccept = (amount, request) => {
    const newRequests = this.props.global.incomingMoneyRequests.filter((r) => {
      return r !== request;
    });
    cPayRequest('/moneyRequests/' + request.id, 'delete')
    const newBalance = this.props.global.userBalance - amount;
    this.setState(
      {
        balance: newBalance,
      },
      this.setState({
        incomingRequests: newRequests,
      })
    );
    this.props.changeIncomingMoneyRequests(newRequests);
    this.props.changeUserBalance(newBalance);
  };

  handleReject = (request) => {
    const newRequests = this.props.global.incomingMoneyRequests.filter((r) => {
      return r !== request;
    });
    this.setState({
      incomingRequests: newRequests,
    });
    this.props.changeIncomingMoneyRequests(newRequests);
  };
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

  render() {
    const {
      request,
      user,
      global,
      balance,
      changeIncomingMoneyRequests,
      changeUserBalance,
    } = this.props;

    return (
        <div className="h-12 flex items-center px-4 py-3 border-b bg-gray-100 rounded-xl shadow-md my-2">
          <p className="text-gray-600 text-sm mx-2">
            <span className="font-bold block">
            <strong className = "uppercase">({request.originUser}) </strong>
            <span className = "font-light text-sm ">{request.incomingFirstName}</span>{" "}
            <span className = "font-light text-sm ">{request.incomingLastName}</span>
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
              className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white shadow-lg"
              onClick={this.sendPopOn}
            >
              Accept
            </button>
            <button
              className="mx-1 px-2 py-1 bg-red-500 rounded-3xl text-white shadow-lg"
              onClick={() => this.handleReject(request)}
            >
              Reject
            </button>
        </div>
        {this.state.sendOpen ? (
          <AcceptMoneyReq
            className = "rounded-xl"
            request={request}
            user={user}
            acceptRequest={this.handleAccept}
            minimizeSend={this.sendPopOff}
          />
        ) : null}
      </div>
    );
  }
}

export default IncomingMoneyRequest;
