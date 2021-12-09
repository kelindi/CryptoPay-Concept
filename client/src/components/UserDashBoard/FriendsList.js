import React, { Component, useState } from "react";
import { uuid } from "uuidv4";
import MoneyRequest from "../../classes/MoneyRequest";
import FriendRequest from "../../classes/FriendRequest";

/*
TODO
note: please use camelCaseCase
Classes need to have CapitalNames
Have descriptive function names like createSomething
Comment complex code
Only do work in your file
1. Display all of the user's friends
2. Each user friend should have their own "row"
    Shows user pf picture and first and last name
3. When user div is clicked, create "pop up"
    show user pf picture name and have options to send money and request money
    write a comment in this code to open another popup/something for entering amount etc.
4. add friend button at bottom (look at sketch)
    when clicked create pop up in the center and search by username in database
    each result should show: username, pf picture, and friend request button
*/

// All above are realised.
import cPayRequest from "../../CryptoPayClient";

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      usersFound: [],
      userNameToSearch: "",
      showFriendPopUp: false,
      selectedFriend: null,
      showAddFriends: false,
      showFriendMoneyRequest: false,
      searchContent: "",
      amount: "",
      balance: this.props.user.currentAccountBalance,
      tab: false,
    };
    console.log(props);
  }

  deleteFriendRequest = async (friend) => {
    let rIndex = this.props.user.sentFriendRequests.findIndex(
      (req) => req.destinationUser === friend
    );
    let r = this.props.user.sentFriendRequests[rIndex];
    const { status, data } = await r.deleteRequest();
    if (status === 200) {
      await this.props.updateUserData();
    }
    return;
  };

  sendFriendRequest = async (userName) => {
    let newFr = {
      originUser: this.props.user.userName,
      destinationUser: userName,
      date: new Date(),
    };
    const { status, data } = await cPayRequest(
      "/friendRequests",
      "post",
      newFr
    );
    if (status === 200) {
      await this.props.updateUserData();
    }
  };

  addFriends = async () => {
    const { status, data } = await cPayRequest("/api/users/all", "get");
    console.log(status, data);
    if (status === 200) {
      this.setState({ allUsers: data, showAddFriends: true });
    }
  };

  handleSend = () => {
    //backend call to add money into the reciever's account
    const newBalance = this.state.balance - this.state.amount;
    console.log(newBalance);
    this.setState({
      balance: newBalance,
    });
    this.props.changeUserBalance(newBalance);
  };

  isUserNameFriend = (userName) => {
    if (
      this.props.user.friendsList.some((friend) => friend.userName === userName)
    ) {
      return true;
    }
    return false;
  };

  friendPop(friend) {
    this.setState({ selectedFriend: friend, showFriendPopUp: true });
    /*set the user to be shown and trigger the pop-up */
  }

  userFilter = (event) => {
    this.setState({ searchContent: event.target.value }, () => {
      const filteredUsers = this.state.allUsers.filter(
        (u) =>
          u.userName.toString().includes(event.target.value) &&
          event.target.value !== "" &&
          u.userName !== this.props.user.userName &&
          this.isUserNameFriend(u.userName) === false
      );
      this.setState({ usersFound: filteredUsers });
    });

    /* find users base on the input username and show them */
    // console.log(this.state.searchContent);
    // console.log(this.state.usersFound);
  };

  handleRequest() {
    const amount = this.amount;
    if (!isNaN(+amount)) {
      const requestee = this.state.selectedFriend;
      const newReqList = this.props.user.sentMoneyRequests;
      const newReq = new MoneyRequest(
        this.props.user.userName,
        requestee,
        this.state.amount,
        "10-01-2021"
      );
      newReqList.push(newReq);
      this.props.changeSentMoneyRequests(newReqList);
    }
  }

  closeFriendPopUp = () => {
    this.setState({
      showAddFriends: false,
      selectedFriend: null,
      usersFound: [],
      searchContent: "",
    });
  };

  toggleTab = (state) => {
    console.log("clicked");
    this.setState(
      {
        tab: state,
      },
      console.log(this.state.tab)
    );
  };

  render() {
    const { global, changeSentFriendRequests } = this.props;
    return (
      <div className="w-full h-screen flex flex-col bg-yellow-50">
        {this.state.showFriendPopUp ? (
          <div>
            {/* pop-up of show info a certain friend */}
            <div className=" bg-white rounded md:w-1/3 w-2/3 border shadow-lg fixed z-100 left-1/3 top-1/3 ">
              <div className="rounded-t bg-blue-300 text-black">
                <div className="relative py-3 px-2 flex">
                  <span className="font-semibold text-black md:text-base text-sm">
                    {this.state.selectedFriend.userName}
                  </span>
                </div>
              </div>

              <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100">
                {/* show user info and functions */}
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src={this.state.selectedFriend.profilePicture}
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold block">
                    {this.state.selectedFriend.userName}
                  </span>
                  <span>{this.state.selectedFriend.firstName}</span>{" "}
                  <span>{this.state.selectedFriend.lastName}</span>
                </p>
                <div className=" text-center flex flex-col">
                  <input
                    className="ml-5 w-50 pl-2 "
                    type="text"
                    value={this.state.amount}
                    onChange={(event) => {
                      this.setState({ amount: event.target.value });
                    }}
                    placeholder="Amount to send/request"
                  />
                  <br></br>
                  <div>
                    <button
                      className="mx-1 px-2 py-1 bg-green-500 rounded-3xl text-black ml-5"
                      onClick={() => this.handleSend()}
                    >
                      <span className="font-semibold text-black md:text-base text-sm">
                        Send
                      </span>
                    </button>

                    <button
                      className="mx-1 px-2 py-1 bg-green-500 rounded-3xl text-black ml-4"
                      onClick={() => this.handleRequest}
                    >
                      <span className="font-semibold text-black md:text-base text-sm">
                        Request
                      </span>
                    </button>

                    <button
                      className="mx-1 px-2 py-1 bg-red-500 rounded-3xl text-black ml-9"
                      onClick={() => {
                        this.setState({ showFriendPopUp: false });
                      }}
                    >
                      <span className="font-semibold text-black md:text-base text-sm">
                        Cancel
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.showAddFriends ? (
          // pop-up for search and add new friend from database
          <div className="bg-transparent w-screen h-screen shadow-lg fixed left-0 z-50">
            <div className="z-100 md:w-1/3 w-1/3 left-1/3 top-1/4 absolute">
              <div className="w-full">
                <input
                  //   input box for input username
                  className={
                    "py-3 px-6 w-full outline-none bg-warm-gray-300 " +
                    (this.state.usersFound.length === 0
                      ? "rounded-full"
                      : "rounded-t-xl")
                  }
                  value={this.state.searchContent}
                  onChange={this.userFilter}
                  type="text"
                  placeholder="Search By User Name"
                />
                <div
                  className={"overflow-auto bg-warm-gray-300 relative max-h-60"}
                >
                  {/* show all users' info according to input username */}
                  {this.state.usersFound.map((u) => (
                    <div
                      className="flex px-4 py-3 hover:bg-gray-100"
                      key={uuid()}
                    >
                      <img
                        className="h-8 w-8 rounded-full object-cover mx-1"
                        src={u.pf}
                      />

                      <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold block">{u.userName}</span>
                        <span>{u.firstName}</span> <span>{u.lastName}</span>
                      </p>

                      {!this.props.user.friendsList.some(
                        (friend) => friend.userName === u.userName
                      ) ? (
                        //   only friends not in friendlist have "Send Friend Request" Button
                        <div className="ml-auto ">
                          {this.props.user.sentFriendRequests.some(
                            (request) => request.destinationUser === u.userName
                          ) ? (
                            <button
                              className="w-50 mx-1 px-2 py-1 bg-red-500 rounded-3xl text-white"
                              onClick={() =>
                                this.deleteFriendRequest(u.userName)
                              }
                            >
                              <span>Cancel Request</span>
                            </button>
                          ) : (
                            <button
                              className="w-50 mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white"
                              onClick={async () => {
                                let newReqList =
                                  this.props.user.sentFriendRequests;
                                newReqList = newReqList.filter(
                                  (req) => req.destinationUser === u.userName
                                );
                                await this.props.changeSentFriendRequests(newReqList);
                                this.sendFriendRequest(u.userName);
                              }}
                            >
                              <span> Send Friend Request </span>
                            </button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div
                  className={
                    "bg-warm-gray-300 rounded-b-lg h-6 w-full " +
                    (this.state.usersFound.length === 0 ? "hidden" : "")
                  }
                ></div>
              </div>
            </div>
            <div
              className="bg-black opacity-80 w-full h-full"
              onClick={this.closeFriendPopUp}
            ></div>
          </div>
        ) : null}

        <div className="fixed w-2/12 h-full">
          <div className="w-full h-full relative">
            <div className="font-bold flex flex-row h-10 items-center justify-center bg-gray-800">
              <div className="rounded-lg text-gray-800 bg-gray-700 flex flex-row">
                <button
                  onClick={() => {
                    this.toggleTab(false);
                  }}
                  className={
                    "px-4 " +
                    (this.state.tab
                      ? "text-warm-gray-400"
                      : "bg-warm-gray-400 rounded-md")
                  }
                >
                  Friends
                </button>
                <button
                  onClick={() => {
                    this.toggleTab(true);
                  }}
                  className={
                    "px-4 " +
                    (this.state.tab
                      ? "bg-warm-gray-400 rounded-md"
                      : "text-warm-gray-400")
                  }
                >
                  Pending
                </button>
              </div>
            </div>
            <div
              className={
                "bg-gray-900 h-full " + (this.state.tab ? "hidden" : null)
              }
            >
              {this.props.user.friendsList.map((friend) => (
                // list all friends
                <div
                  key={uuid()}
                  className="flex items-center px-4 py-3 hover:bg-warm-gray-400 hover:text-gray-900 text-gray-300 rounded-md"
                  onClick={() => this.friendPop(friend)}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src={friend.profilePicture}
                  />

                  <p className="text-sm mx-2">
                    <span className="font-bold block">{friend.userName}</span>
                    <span>{friend.firstName}</span>{" "}
                    <span>{friend.lastName}</span>
                  </p>
                </div>
              ))}
            </div>
            <div
              className={
                "bg-gray-900 h-full " + (this.state.tab ? null : "hidden")
              }
            >
              {this.props.user.sentFriendRequests.map((request) => (
                <div
                  key={uuid()}
                  className="flex items-center px-4 py-3 hover:bg-warm-gray-400 hover:text-gray-900 text-gray-300 rounded-md relative"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src={
                      "https://avatars.dicebear.com/api/bottts/" +
                      request.destinationUser +
                      ".png"
                    }
                  />
                  <p className="text-sm mx-2">
                    <span className="font-bold block">
                      {request.destinationUser}
                    </span>
                    <span>{request.destinationFirstName}</span>{" "}
                    <span>{request.destinationLastName}</span>
                  </p>
                  <div className="ml-auto text-xs">
                    <button
                      onClick={() => console.log()}
                      className="mx-1 px-3 py-1 bg-red-500 rounded-3xl text-white shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-5 w-full flex justify-center items-center">
              <button
                className="bg-warm-gray-400 rounded-3xl block text-gray-800 mx-auto px-5 py-2 hover:bg-warm-gray-500 hover:text-gray-300"
                onClick={() => {
                  this.addFriends();
                }}
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsList;
