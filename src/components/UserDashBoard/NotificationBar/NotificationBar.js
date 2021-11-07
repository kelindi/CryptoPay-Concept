import React, { Component } from "react";
import { uuid } from "uuidv4";
import FriendRequest from "../UserFeed/FriendRequest";

class NotificationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncomingFriendRequests: false,
      showSettings:false,
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
        <div className="bg-gray-600 py-4 flex flex-row">
          <div className = "ml-auto">
            <div className="relative inline-block mr-6">
              <svg
                onClick={() =>
                  this.setState({
                    showIncomingFriendRequests:
                      !this.state.showIncomingFriendRequests,
                  })
                }
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
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
            <div className="relative inline-block mr-6">
              <svg
              onClick={() =>
                this.setState({
                  showSettings:
                    !this.state.showSettings,
                })
              }
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </g>
              </svg>


              {this.state.showSettings ?
              (<div className="md:w-1/3 w-1/2 border fixed z-100 left-1/4 top-1/4 mt-1 block bg-gray-100 rounded-xl shadow-lg">
                      test
              </div>) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationBar;
