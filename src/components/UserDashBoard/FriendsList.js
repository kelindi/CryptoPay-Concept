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
      userNameToSearch: "",
      friends: this.props.currentUser.friends,
      showFriendPopUp: false,
      selectedFriend: null,
    };
    this.friendPop = this.friendPop.bind(this);
  }

  friendPop(friend) {
    this.setState(
      { selectedFriend: friend },
      this.setState({ showFriendPopUp: true }),
      console.log(this.state.showFriendPopUp)
    );
  }

  render() {
    return (
      <div>
        {this.state.showFriendPopUp ? (
          <div className="absolute z-100 w-2/6 h-auto mx-auto left-0 right-0 top-1/4">
            <div>
              HELLO
              <img src={this.state.selectedFriend.profilePicture}></img>
            </div>
          </div>
        ) : null}

        <h1> Friend List </h1>
        <div>
          {this.state.friends.map((friend) => (
            <div key={uuid()}>
              <h1> {friend.firstName} </h1>
              <h1> {friend.lastName} </h1>
              <img
                className="rounded-full h-2/3 w-2/3 m-4 flex items-center justify-center"
                src={friend.profilePicture}
                alt="Profile Photo"
                onClick={() => this.friendPop(friend)}
              />
            </div>
          ))}
        </div>
        <button> Add New Friend </button>
      </div>
    );
  }
}

class Pop extends Component {}

export default FriendsList;
