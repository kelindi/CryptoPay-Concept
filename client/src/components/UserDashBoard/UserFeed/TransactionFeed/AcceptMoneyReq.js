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
      <div className="bg-transparent w-screen h-screen shadow-lg fixed top-0 left-0 z-50">
        <div className="bg-gray-900 shadow-lg fixed z-100 left-1/3 top-1/4 rounded-xl">
          <div className="text-base p-2 h-44 w-96 text-custom-100 flex flex-col justify-center ">
            <div className="text-center my-2">
              Send {request.originUser}
              <strong> {request.amount}</strong>
              <img
                className="h-full w-4 inline mx-1"
                alt="ETH"
                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              />{" "}
              ?
            </div>
            <div className="w-1/1 mt-2 text-center">
              <button
                className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full"
                onClick={() =>
                  this.props.acceptRequest(request.amount, request)
                }
              >
                Yes
              </button>
              <button
                className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full"
                onClick={() => this.props.minimizeSend()}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-80 w-full h-full" onClick={()=>this.props.minimizeSend()}></div>
      </div>
    );
  }
}

export default AcceptMoneyReq;
