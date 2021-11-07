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
    const filteredUsers = this.state.allUsers.filter((u) =>
      u.userName.includes(value)
    );
    this.setState({ usersFound: filteredUsers, searchContent: value });
    console.log(this.state.searchContent);
    console.log(this.state.usersFound);
  };

  render() {
    return (
      <div className="w-full flex flex-row ">
        {this.state.showFriendPopUp ? (
          <div className=" ">
            <button
              onClick={() => {
                this.setState({ showFriendPopUp: false });
              }}
            >
              {" "}
              <p>' X '</p>{" "}
            </button>
            {this.state.selectedFriend.firstName}
            {this.state.selectedFriend.lastName}
            <img src={this.state.selectedFriend.profilePicture}></img>
            <button> Send </button>
            <button> Request </button>
          </div>
        ) : null}

        {this.state.showAddFriends ? (
          <div className="bg-white rounded md:w-1/3 w-1/2 border shadow-lg fixed z-100 left-1/4 top-1/3">
            <button
              onClick={() => {
                this.setState({ showAddFriends: false });
              }}
            >
              <span> X </span>
            </button>
            <p>Search By User Name</p>
            <input
              value={this.state.searchContent}
              onChange={this.userFilter}
              type="text"
              placeholder="UserName"
            />
            {this.state.usersFound.map((u) => (
              <div key={uuid()}>
                <h1> {u.firstName} </h1>
                <h1> {u.lastName} </h1>
                <img
                  className="rounded-full h-2/3 w-2/3 m-4 flex items-center justify-center"
                  src={u.profilePicture}
                  alt="Profile Photo"
                />
                {!this.state.friends.includes(u) ? (
                  <button> Send Friend Request </button>
                ) : null}
              </div>
            ))}
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
        <div className="absolute bottom-0 flex flex-col justify-center text-center">
          <button
            className="bg-blue-500 rounded-3xl text-white w-auto items-center"
            onClick={() => {
              this.setState({ showAddFriends: true });
            }}
          >
            Add New Friend
          </button>
        </div>
      </div>
    );
  }
}

class Pop extends Component {}

export default FriendsList;
