import React, { Component, useState } from "react";
import { uuid } from "uuidv4";
import Transaction from "../../classes/Transaction";
import MoneyRequest from "../../classes/MoneyRequest";

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

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: this.props.backend.users,
      usersFound: [],
      userNameToSearch: "",
      friends: this.props.currentUser.friends,
      showFriendPopUp: false,
      selectedFriend: null,
      showAddFriends: false,
      showFriendMoneyRequest: false,
      searchContent: "",
      amount: "",
      balance: this.props.currentUser.currentAccountBalance,
    };
  }

  handleSend = () => {
    //backend call to add money into the reciever's account
    const newBalance = this.state.balance - this.state.amount;
    console.log(newBalance);
    this.setState({
      balance: newBalance,
    });
    this.props.changeUserBalance(newBalance);
  };


  friendPop(friend) {
    this.setState({ selectedFriend: friend, showFriendPopUp: true });
    /*set the user to be shown and trigger the pop-up */
  }

  userFilter = (event) => {
    const target = event.target;
    const value = target.value;
    // this.setState({searchContent: value})
    const filteredUsers = this.state.allUsers.filter(
      (u) =>
        u.userName.includes(value) &&
        value !== "" &&
        u !== this.props.currentUser &&
        !this.state.friends.includes(u)
    );
    this.setState({ usersFound: filteredUsers, searchContent: value });
    /* find users base on the input username and show them */
    // console.log(this.state.searchContent);
    // console.log(this.state.usersFound);
  };

  handleRequest() {
    const amount = this.amount
    if (!isNaN(+amount)) {
      const requestee = this.state.selectedFriend
      const newReqList = this.props.global.sentMoneyRequests;
      const newReq = new MoneyRequest(
        this.props.currentUser,
        requestee,
        this.state.amount,
        "10-01-2021"
      );
      newReqList.push(newReq);
      this.props.changeSentMoneyRequests(newReqList);
    }
  }

  render() {
    const { global, changeSentFriendRequests } = this.props;
    return (
      <div className="w-full flex flex-col relative">
        {this.state.showFriendPopUp ? (
          <div>
            {/* pop-up of show info a certain friend */}
            <div className=" bg-white rounded md:w-1/3 w-2/3 border shadow-lg fixed z-100 left-1/3 top-1/3 ">

              

              <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">{this.state.selectedFriend.userName}</span> 
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
                      <span className="font-semibold text-black md:text-base text-sm">Send</span>
                    </button>

                    <button
                      className="mx-1 px-2 py-1 bg-green-500 rounded-3xl text-black ml-4"
                      onClick={() => this.handleRequest}
                    >
                      <span className="font-semibold text-black md:text-base text-sm">Request</span>
                    </button>

                    <button
                      className="mx-1 px-2 py-1 bg-red-500 rounded-3xl text-black ml-9"
                      onClick={() => {
                        this.setState({ showFriendPopUp: false });
                      }}
                    >
                      <span className="font-semibold text-black md:text-base text-sm">Cancel</span>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.showAddFriends ? (
          // pop-up for search and add new friend from database
          <div className="bg-transparent rounded md:w-1/3 w-1/3 shadow-lg fixed z-100 left-1/3 top-1/4">
            <div className="flex flex-row">
              <input
                //   input box for input username
                className="rounded-full py-3 px-6 w-full"
                value={this.state.searchContent}
                onChange={this.userFilter}
                type="text"
                placeholder="Search By User Name"
              />

              <button
                onClick={() => {
                  this.setState({ showAddFriends: false });
                }}
              >
                {/* button to close pop-up */}
                <span className="font-bold text-2xl"> &nbsp;X </span> 
              </button>
            </div>

            <div className="overflow-auto max-h-96 bg-white">
              {/* show all users' info according to input username */}
              {this.state.usersFound.map((u) => (
                <div
                  className="flex px-4 py-3 border-b hover:bg-gray-100"
                  key={uuid()}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src={u.profilePicture}
                  />

                  <p className="text-gray-600 text-sm mx-2">
                    <span className="font-bold block">{u.userName}</span>
                    <span>{u.firstName}</span> <span>{u.lastName}</span>
                  </p>

                  {!this.state.friends.includes(u) ? (
                    //   only friends not in friendlist have "Send Friend Request" Button

                    <div className="ml-auto ">
                      {global.sentFriendRequests.includes(u) ? (
                        <button
                          className="w-50 mx-1 px-2 py-1 bg-red-500 rounded-3xl text-white"
                          onClick={() => {
                            const newFriendRequests = global.sentFriendRequests;
                            newFriendRequests.pop(u);
                            changeSentFriendRequests(newFriendRequests);
                          }}
                        >
                          
                          <span>Cancel Request</span>
                        </button>
                      ) : (
                        <button
                          className="w-50 mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white"
                          onClick={() => {
                            // change global sentFriend list
                            const newFriendRequests = global.sentFriendRequests;

                            newFriendRequests.push(u);

                            changeSentFriendRequests(newFriendRequests);
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
          </div>
        ) : null}

        <div>
          <div className="font-bold">
            <span className="m-3">Friend List</span>
          </div>
          <div className="bg-transparent w-full">
            {this.state.friends.map((friend) => (
              // list all friends
              <div
                className="flex items-center px-4 py-3 border-b   hover:bg-gray-100"
                onClick={() => this.friendPop(friend)}
              >
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src={friend.profilePicture}
                />

                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold block">{friend.userName}</span>
                  <span>{friend.firstName}</span> <span>{friend.lastName}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-1.5 w-2/12 flex">
          <button
            className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white w-full"
            onClick={() => {
              this.setState({ showAddFriends: true });
            }}
          >
            {/* Add new friends botton */}
            <span>{"Add New Friend"}</span>
          </button>
        </div>
      </div>
    );
  }
}

export default FriendsList;
