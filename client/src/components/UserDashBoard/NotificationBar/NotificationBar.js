import React, { Component } from "react";
import { uuid } from "uuidv4";
import FriendRequest from "../UserFeed/FriendRequest";

class NotificationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncomingFriendRequests: false
    };
  }

  acceptRequest = (friend) => {
    const newIncomingFriendRequests =
      this.props.global.incomingFriendRequests.filter(
        (request) => request !== friend
      );
    const newFriendsList = this.props.global.friendsList;
    newFriendsList.push(friend);
    this.props.changeIncomingFriendRequests(newIncomingFriendRequests);
    this.props.changeFriendsList(newFriendsList);
  };

  deleteRequest = (requestToRemove) => {
    const newIncomingFriendRequests =
      this.props.global.incomingFriendRequests.filter(
        (request) => request !== requestToRemove
      );
    this.props.changeIncomingFriendRequests(newIncomingFriendRequests);
  };


  render() {
    const { global } = this.props;
    return (
      <div className="font-sans">
        <div className="bg-gray-800 h-10 py-2 relative">
          <div className = "ml-auto relative">
          <div className = "text-gray-300 float-left ml-6 text-lg">CryptoPay</div>
            <div className="float-right relative inline-block mr-6 my-2">
              <svg
                onClick={() =>
                  this.setState({
                    showIncomingFriendRequests:
                      !this.state.showIncomingFriendRequests,
                  })
                }
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#FFFFFF"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              <span
                className={
                  "flex absolute -top-2.5 -right-2 h-4 w-4 bg-red-500 rounded-full items-center justify-center text-xs " +
                  (global.incomingFriendRequests.length > 0
                    ? "animate-small-slow-ping"
                    : "hidden")
                }
              >
                {global.incomingFriendRequests.length}
              </span>
              <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 w-96">
                {this.state.showIncomingFriendRequests &&
                global.incomingFriendRequests.length ? (
                  <div className="py-2">
                    {global.incomingFriendRequests.map((requestor) => (
                      <div className="flex items-center px-4 py-3 border-b mx-2 bg-gray-100 rounded-xl shadow-lg my-1.5">
                        <img
                          className="h-8 w-8 rounded-full object-cover mx-1"
                          src={requestor.profilePicture}
                        />
                        <p className="text-gray-600 text-sm mx-2">
                          <span className="font-bold block">
                            {requestor.userName}
                          </span>
                          <span>{requestor.firstName}</span>{" "}
                          <span>{requestor.lastName}</span>
                        </p>
                        <div className="ml-auto text-xs">
                          <button
                            onClick={() => this.acceptRequest(requestor)}
                            className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white shadow-lg"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => this.deleteRequest(requestor)}
                            className="mx-1 px-2 py-1 bg-gray-200 rounded-3xl shadow-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationBar;
