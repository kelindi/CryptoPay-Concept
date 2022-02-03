import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { uuid } from "uuidv4";
import cPayRequest from "../../../CryptoPayClient";
import Loading from "../../Loading";
import FriendRequest from "../UserFeed/FriendRequest";
import { logout } from "../../../CheckSession";

class NotificationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncomingFriendRequests: false,
      redirect: false,
    };
  }

  acceptRequest = async (request) => {
    let body = {
      friendUserName: request.originUser,
    };
    await cPayRequest(
      "/users/addFriend/" + this.props.user.userName.toString(),
      "post",
      body
    );
    await request.deleteRequest();
    this.props.updateUser();
  };

  deleteRequest = async (request) => {
    await request.deleteRequest();
    this.props.updateUser();
  };

  logout = () => {
    logout(this);
    this.props.history.push("/login");
  };

  render() {
    const { global } = this.props;
    return (
      <div className="font-sans">
        <div className="bg-gray-900 h-10 py-2 relative">
          <div className="ml-auto relative">
            <div className="text-gray-300 float-left ml-6 text-lg">
              CryptoPay
            </div>
            <div className="float-right relative inline-block mr-6 my-2">
              {/* Log Out Button */}
              {/* Add svg and then redirect it to login page on click */}
              <img
                className="h-4 w-4"
                src="../../../../images/logout-2.jpg"
                onClick={this.logout}
              ></img>
            </div>
            <div className="float-right relative inline-block mr-6 my-2">
              {/* Notification Button */}
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
                  (this.props.user.incomingFriendRequests === null
                    ? "hidden"
                    : this.props.user.incomingFriendRequests.length > 0
                    ? "animate-small-slow-ping"
                    : "hidden")
                }
              >
                {this.props.user.incomingFriendRequests === null
                  ? 0
                  : this.props.user.incomingFriendRequests.length}
              </span>
              <div className="fixed mt-2 bg-gray-700 text-custom-100 rounded-md shadow-lg overflow-hidden w-96 z-100">
                {this.props.user.incomingFriendRequests === null ? (
                  <div> </div>
                ) : this.state.showIncomingFriendRequests &&
                  this.props.user.incomingFriendRequests.length > 0 ? (
                  <div>
                  <div className="py-2 z-100">
                    {this.props.user.incomingFriendRequests.map((requestor) => (
                      <div>
                        <div className="flex items-center px-4 py-3 mx-2 bg-gray-800 rounded-xl shadow-lg my-1.5">
                          <img
                            className="h-8 w-8 rounded-full object-cover mx-1"
                            src={
                              "https://avatars.dicebear.com/api/bottts/" +
                              requestor.originUser +
                              ".png"
                            }
                          />
                          <p className="text-sm mx-2">
                            <span className="font-bold block">
                              {requestor.originUser}
                            </span>
                            <span className="font-light text-sm ">
                              {requestor.originFirstName}
                            </span>{" "}
                            <span className="font-light text-sm ">
                              {requestor.originLastName}
                            </span>
                          </p>

                          <div className="ml-auto text-xs">
                            <button
                              onClick={() => this.acceptRequest(requestor)}
                              className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => this.deleteRequest(requestor)}
                              className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="top-0 left-0 w-screen h-screen z-50 bg-red-500"></div>
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
