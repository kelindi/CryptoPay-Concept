import React, { Component } from "react";
import { acceptRequest, rejectRequest } from "./FriendRequestResponses";

class FriendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestor: this.props.requestor,
    };
  }

  render() {
    // const { user,requestor, acceptRequest } = this.props;
    const { user, requestor, acceptRequest, rejectRequest } = this.props;
    return (
      <div className="flex flex-row rounded-2xl w-auto h-20 bg-gray-100 mt-2">
        <div className="rounded-full h-20 w-20 flex-shrink-0">
          <img
            className="rounded-full h-20 w-20 flex px-3 py-3 items-center
                    justify-center"
            src={requestor.profilePicture}
          ></img>
        </div>
        <div className="flex flex-row my-auto w-auto">
          <div className="flex flex-col text-center">
            <div>
              <b className="mx-1">({requestor.originUser})</b>
            </div>
            <div className="flex flex-row tracking-wide">
              <p className="mx-1 text-xs">{requestor.destinationFirstName}</p>
              <p className="mx-1 text-xs">{requestor.destinationLastName}</p>
            </div>
          </div>
          <div>
            <div className="my-auto">
              <div className="flex flex-row">
                <button
                  className="bg-green-400 rounded-2xl mx-2 px-2"
                  onClick={() => this.props.acceptRequest(this.state.requestor)}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-600 rounded-2xl mx-2 px-2"
                  onClick={() => this.props.rejectRequest(this.state.requestor)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendRequest;
