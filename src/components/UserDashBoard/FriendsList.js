import React, { Component, useState } from "react";
import { uuid } from "uuidv4";

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
      searchContent: "",
    };
  }

  friendPop(friend) {
    this.setState({ selectedFriend: friend, showFriendPopUp: true });
  }

  userFilter = (event) => {
    const target = event.target;
    const value = target.value;
    // this.setState({searchContent: value})
    const filteredUsers = this.state.allUsers.filter(
      (u) => u.userName.includes(value) && value !== ""
    );
    this.setState({ usersFound: filteredUsers, searchContent: value });
    // console.log(this.state.searchContent);
    // console.log(this.state.usersFound);
  };

  render() {
    return (
      <div className="w-full flex flex-row ">
        {this.state.showFriendPopUp ? (
          <div className=" bg-white rounded md:w-1/3 w-1/2 border shadow-lg fixed z-100 left-1/3 top-1/3 ">
            <div>
              <button
                onClick={() => {
                  this.setState({ showFriendPopUp: false });
                }}
              >
                <p> X </p>
              </button>
            </div>

            <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100">
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
              <button className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white">
                {" "}
                Send{" "}
              </button>
              <button className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white">
                {" "}
                Request{" "}
              </button>
            </div>
          </div>
        ) : null}

        {this.state.showAddFriends ? (
          <div className="bg-transparent rounded md:w-1/3 w-1/3 border shadow-lg fixed z-100 left-1/3 top-1/4">
            <div className="flex flex-row">
              <input
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
                <span className = "font-bold"> &nbsp;&nbsp;X </span>
              </button>
            </div>

            <div className="overflow-auto max-h-96 bg-white">
              {this.state.usersFound.map((u) => (
                <div
                  className="flex items-center px-4 py-3 border-b hover:bg-gray-100"
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
                    <button className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white">
                      Send Friend Request{" "}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div>
          <b className="align-middle"> Friend List </b>
          <div className="bg-transparent w-full">
            {this.state.friends.map((friend) => (
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
        <div className="absolute bottom-0 flex flex-auto w-2/12">
          <button
            className="mx-1 px-2 py-1 bg-blue-500 rounded-3xl text-white w-full"
            onClick={() => {
              this.setState({ showAddFriends: true });
            }}
          >
            <span>{"Add New Friend"}</span>
          </button>
        </div>
      </div>
    );
  }
}

export default FriendsList;
