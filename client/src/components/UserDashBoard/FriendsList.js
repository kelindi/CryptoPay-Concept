import React, { Component, useState } from "react";
import { uuid } from "uuidv4";
import MoneyRequest from "../../classes/MoneyRequest";
import FriendRequest from "../../classes/FriendRequest";
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
  }

  deleteFriendRequest = async (request) => {
    console.log(request)
    const { status, data } = await cPayRequest(
      "/friendRequests/"+request.id,
      "delete"
    );
    if (status === 200) {
      await this.props.updateUserData();
    }
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

  handleSend = async () => {
    if (this.state.amount <= this.props.user.userBalance) {
      if (this.props.user.userBalance - this.state.amount >= 0) {
        let { status, data } = await cPayRequest(
          "/api/user/" + this.props.user.userName + "/friends",
          "get"
        );
        let rWalletAddress = this.state.selectedFriend.walletAddress;
        let transactionSent = await this.props.sendMoney(
          rWalletAddress,
          this.state.amount
        );
        if (transactionSent) {
          console.log("hey")
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, "0");
          let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = today.getFullYear();

          let h = String(today.getHours());
          let m = String(today.getMinutes()).padStart(2, "0");

          let date = yyyy + "-" + mm + "-" + dd;
          let time = h + ":" + m;
          let body = {
            originUser: this.props.user.userName,
            destinationUser: this.state.selectedFriend.userName,
            amount: this.state.amount,
            date: date,
            time: time,
          };
          console.log(JSON.stringify(body));
          // Add it to database
          cPayRequest("/transaction", "post", body);
        } else {
          alert("Transaction failed");
        }
        // if(status==)
        // backend call to update transactions
      } else {
        alert("Not enough balance!");
      }
      // minimize the pop up
      this.props.updateUserData();
      this.setState({ showFriendPopUp: false, amount:0, selectedFriend:null });
    } 
    else {
      alert("Please enter a valid amount");
    }
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
    if (this.state.amount <= this.props.user.userBalance) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = String(today.getFullYear());
      let h = String(today.getHours());
      let m = String(today.getMinutes()).padStart(2, "0");
      let date = yyyy + "/" + mm + "/" + dd;
      let time = h + ":" + m;
      // find wallet address of reciever
      let rWalletAddress = this.state.selectedFriend.walletAddress;

      let body = {
        originUser: this.props.user.userName,
        destinationUser: this.state.selectedFriend.userName,
        destinationWallet: rWalletAddress,
        amount: this.state.amount,
        date: date,
      };
      console.log(JSON.stringify(body));
      cPayRequest("/moneyRequests", "post", body);
      console.log("done");
    }
    this.props.updateUserData()
    this.setState({showFriendPopUp:false, amount:0, selectedFriend:null});
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
      <div className="w-full h-screen flex flex-col">
        {this.state.showFriendPopUp ? (
          <div className="h-screen w-screen z-50 top-0 left-0 fixed">
            <div>
              {/* pop-up of show info a certain friend */}
              <div className=" bg-gray-900 rounded-xl h-56 w-96 shadow-lg fixed z-100 left-1/3 top-1/3">
                <div className="flex items-center px-4 py-3 flex-col">
                  <div className="text-custom-100 flex my-3 w-full justify-center text-center">
                    <img
                      className="h-16 w-16 rounded-full object-cover mx-1"
                      src={this.state.selectedFriend.profilePicture}
                    />
                    <p className="text-sm mx-2">
                      <span className="text-xl font-bold block">
                        {this.state.selectedFriend.userName}
                      </span>
                      <span>{this.state.selectedFriend.firstName}</span>{" "}
                      <span>{this.state.selectedFriend.lastName}</span>
                    </p>
                  </div>
                  <div className=" text-center flex flex-col">
                    <label>
                      <img
                        className="h-full w-4 inline"
                        alt="ETH"
                        src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                        size="24"
                      />
                      <input
                        className="bg-gray-800 text-gray-200 w-40 pl-2 py-1 outline-none rounded-md shadow-lg ml-2"
                        type="text"
                        value={this.state.amount}
                        onChange={(event) => {
                          this.setState({ amount: event.target.value });
                        }}
                        placeholder="amount"
                      />
                    </label>
                    <br></br>
                    <div>
                      <button
                        className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full mx-2"
                        onClick={() => this.handleSend()}
                      >
                        Send
                      </button>

                      <button
                        className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full mx-2"
                        onClick={() => this.handleRequest()}
                      >
                        Request
                      </button>

                      <button
                        className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full mx-2"
                        onClick={() => {
                          this.setState({ showFriendPopUp: false });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-black opacity-80 w-full h-full"
              onClick={() => this.setState({ showFriendPopUp: false })}
            ></div>
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
                    " text-custom-100 py-3 px-6 w-full outline-none bg-gray-900 " +
                    (this.state.usersFound.length === 0
                      ? "rounded-full"
                      : "rounded-t-xl")
                  }
                  value={this.state.searchContent}
                  onChange={this.userFilter}
                  type="text"
                  placeholder="Search By User Name"
                />
                <div className={"overflow-auto bg-gray-900 relative max-h-60"}>
                  {/* show all users' info according to input username */}
                  {this.state.usersFound.map((u) => (
                    <div
                      className="flex px-4 py-3 hover:bg-gray-800 text-custom-100"
                      key={uuid()}
                    >
                      <img
                        className="h-8 w-8 rounded-full object-cover mx-1"
                        src={u.pf}
                      />

                      <p className="text-sm mx-2">
                        <span className="font-bold block">{u.userName}</span>
                        <span>{u.firstName}</span> <span>{u.lastName}</span>
                      </p>

                      {!this.props.user.friendsList.some(
                        (friend) => friend.userName === u.userName
                      ) ? (
                        //   only friends not in friendlist have "Send Friend Request" Button
                        <div className="ml-auto ">
                          {this.props.user.sentFriendRequests.find(
                            (request) => request.destinationUser === u.userName
                          ) ? (
                            <button
                              className="w-50 mx-1 px-3 py-1 bg-black hover:bg-gray-900 rounded-3xl text-custom-100"
                              onClick={() =>
                                this.deleteFriendRequest(this.props.user.sentFriendRequests.filter(
                                  (request) => {return request.destinationUser === u.userName})[0])
                              }
                            >
                              <span>Cancel</span>
                            </button>
                          ) : (
                            <button
                              className="w-50 mx-1 px-3 py-1 bg-warm-gray-400 hover:bg-warm-gray-500 hover:text-custom-100 rounded-3xl text-black"
                              onClick={async () => {
                                let newReqList =
                                  this.props.user.sentFriendRequests;
                                newReqList = newReqList.filter(
                                  (req) => req.destinationUser === u.userName
                                );
                                this.props.changeSentFriendRequests(newReqList);
                                this.sendFriendRequest(u.userName);
                              }}
                            >
                              <span>Add Friend</span>
                            </button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div
                  className={
                    "bg-gray-900 rounded-b-lg h-6 w-full " +
                    (this.state.usersFound.length === 0 ? "hidden" : "")
                  }
                ></div>
              </div>
            </div>
            <div
              className="bg-black opacity-80 w-full h-full"
              onClick={this.closeFriendPopUp}
            ></div>
            <div className="w-full h-28"></div>
          </div>
        ) : null}

        <div className="fixed w-2/12 h-full">
          <div className="w-full h-full relative">
            <div className="font-bold flex flex-row h-10 items-center justify-center bg-gray-900">
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
                "bg-gray-900 h-full overflow-scroll " +
                (this.state.tab ? "hidden" : null)
              }
            >
              {this.props.user.friendsList === null ? (
                Array.from({ length: 30 }).map((n) => (
                  // list all friends
                  <div>
                  <div
                    key={n}
                    className="flex items-center px-3 py-2 h-16 bg-gray-900 rounded-md m-2 animate-pulse"
                  >
                    <div
                      className="h-8 w-8 rounded-full object-cover mx-1 bg-gray-800"
                    />

                    <p className="text-sm mx-2 text-gray-800">
                      <span className="font-bold block bg-gray-800 rounded-md">Username</span>
                      <span className="bg-gray-800 rounded-md">firstname</span>{" "}
                      <span className="bg-gray-800 rounded-md">lastname</span>
                    </p>
                      
                   
                  </div>
                  </div>
                ))
               
              ) : (
                this.props.user.friendsList.map((friend) => (
                  // list all friends
                  <div
                    key={uuid()}
                    className="flex items-center px-4 py-3 h-16 hover:bg-warm-gray-400 hover:text-gray-900 text-gray-300 rounded-md"
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
                ))
              )}
              <div className="w-full h-28"></div>
            </div>
            <div
              className={
                "bg-gray-900 h-full overflow-scroll " +
                (this.state.tab ? null : "hidden")
              }
            >
              {this.props.user.sentFriendRequests === null ? (
                Array.from({ length: 30 }).map((n) => (
                  // list all friends
                  <div>
                  <div
                    key={n}
                    className="flex items-center px-3 py-2 h-16 bg-gray-900 rounded-md m-2 animate-pulse"
                  >
                    <div
                      className="h-8 w-8 rounded-full object-cover mx-1 bg-gray-800"
                    />

                    <p className="text-sm mx-2 text-gray-800">
                      <span className="font-bold block bg-gray-800 rounded-md">Username</span>
                      <span className="bg-gray-800 rounded-md">firstname</span>{" "}
                      <span className="bg-gray-800 rounded-md">lastname</span>
                    </p>
                      
                   
                  </div>
                  </div>
                ))
                
              ) : (
                this.props.user.sentFriendRequests.map((request) => (
                  <div
                    key={uuid()}
                    className="flex items-center px-4 h-16 overflow-hidden py-3 hover:bg-warm-gray-400 hover:text-gray-900 text-gray-300 rounded-md relative"
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
                        onClick={() => this.deleteFriendRequest(request)}
                        className="bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-2 rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
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
