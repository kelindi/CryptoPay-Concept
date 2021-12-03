import React, { Component } from "react";

class AcceptMoneyReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.request.destinationUser,
      balance: this.props.request.destinationUser.currentAccountBalance,
      incomingMoneyRequests: this.props.request.destinationUser.requests,
    };
  }

  render() {
    const { request, acceptRequest, cancel, user } = this.props;

    return (
      <div className="bg-white rounded-xl md:w-1/3 w-1/2 shadow-3xl fixed z-100 left-1/4 top-1/3 border border-black">
        <div className="relative py-3 px-2 item-center text-center ">
          <span className="font-semibold text-black md:text-base text-sm">
            Confirmation of Money Transfer
          </span>
        </div>
        <div className="bg-white md:text-base text-sm p-2 h-48">
          <div className="text-center">
            Are you sure you want to send {request.originUser.userName} (
            {request.originUser.firstName}, {request.originUser.lastName}) $
            <strong className="text-green-700">{request.amount}</strong>?
            This transaction <b>cannot</b> be undone
          </div>
          <div className="w-1/1 mt-2 text-center">
            <button
              className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl shadow-lg text-white"
              onClick={() => this.props.acceptRequest(request.amount, request)}
            >
              Yes
            </button>
            <button className="mx-1 px-2 py-1 bg-red-500 rounded-3xl shadow-lg text-white"
            onClick={() => this.props.minimizeSend()}>
                    
              No, cancel transaction
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AcceptMoneyReq;
