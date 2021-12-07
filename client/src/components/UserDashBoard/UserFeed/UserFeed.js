import React, { Component } from "react";
import FriendRequest from "./FriendRequest";
import SentFriendRequest from "./SentFriendRequest";
import { uuid } from "uuidv4";
import IncomingMoneyRequest from "./TransactionFeed/IncomingMoneyRequest";
import { acceptRequest } from "./FriendRequestResponses";
import OutgoingMoneyRequest from "./TransactionFeed/OutgoingMoneyTransaction";
import UserTransactionTable from "./UserTransactions";

/*
TODO

note: please use camelCaseCase
Classes need to have CapitalNames
Have descriptive function names like createSomething
Comment complex code

1. Friend Requests (incoming)
2. Incoming requests
    display request and whether you want to accept or reject
3. Outgoing requests 
    display that the request is pending and if the person rejected the request also give the option to rescind the request
4. Transactions
    shows sender receiver money and date 11-03-2021 and time

5. Add search bar with filter options (for transactions)


*/

class UserFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
      userFriends: this.props.currentUser.friends,
      userFriendRequests: this.props.currentUser.friendRequests,
      userSentRequests: this.props.currentUser.sentFriendRequests,
      userMoneyRequests: this.props.currentUser.requests,
      userSentMoneyRequests: this.props.currentUser.sentRequests,
      sendOpen: false,
    };
  }

  handleAccept = (requestor) => {
    // event.preventDefault()
    const tempUserFriends = this.state.userFriends;
    tempUserFriends.push(requestor);
    const newRequests = this.state.userFriendRequests.filter((r) => {
      return r !== requestor;
    });
    this.setState(
      {
        userFriends: tempUserFriends,
      }, // backend call to change friends list of user
      // this.state.user.setState({
      //     friends: tempUserFriends
      // },
      this.setState({
        userFriendRequests: newRequests,
      })

      // backend call to change friends requests of user
      // this.state.user.setState({
      //     friendRequests: newRequests
      // })
    );
    this.props.changeFriendsList(tempUserFriends);
    this.props.changeIncomingFriendRequests(newRequests);
  };

  handleReject = (requestor) => {
    const newRequests = this.state.userFriendRequests.filter((r) => {
      return r !== requestor;
    });
    // user.friendRequests = newRequests
    this.setState({
      userFriendRequests: newRequests,
    });

    //

    // const newSenderRequests = requestor.sentRequests.filter(s => {
    //     return s !== user
    // })
    // requestor.sentRequests = newSenderRequests
  };

  handleRescind = (requestee) => {
    const newSentRequests = this.props.global.sentFriendRequests.filter((r) => {
      return r !== requestee;
    });
    this.props.changeSentFriendRequests(newSentRequests)
  };

  sendPopOn = () => {
    this.setState({
      sendOpen: true,
    });
  };

  sendPopOff = () => {
    this.setState({
      sendOpen: false,
    });
  };

  render() {
    const {
      global,
      changeOutgoingMoneyRequests,
      changeIncomingMoneyRequests,
      changeUserBalance,
    } = this.props;
    return (
      <div className="relative h-full flex flex-col">
        {/* Container Div */}
        <div className="bg-white rounded-xl w-auto bg-color m-4 flex flex-col shadow-2xl">
          {/* div for outgoing requests */}
          <div className="font-sans text-black text-xl font-light  tracking-widest text-center">
            OUTGOING FRIEND REQUESTS
          </div>

          <div className={"overflow-y-scroll bg-white rounded-xl mx-5 my-4.5 "+ (global.sentFriendRequests.length > 0 ? "h-32":"")}>
          
            {global.sentFriendRequests.map((requestor) => (
              <div key = { uuid()} className="h-12 flex items-center px-4 py-3 border-b bg-gray-100 rounded-xl shadow-md my-2">
                
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src={requestor.profilePicture}
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold block uppercase">{requestor.destinationUser}</span>
                  <div className="px-1 font-light">
                    Sent on {requestor.date.slice(0, 10)}{" "}
                  </div>
                  {/* <span>{requestor.firstName}</span>{" "}
                  <span>{requestor.lastName}</span> */}
                </p>
                <div className="ml-auto text-xs">
                  <button
                    onClick={() => this.handleRescind(requestor)}
                    className="mx-1 px-2 py-1 bg-red-500 rounded-3xl text-white shadow-lg"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl w-auto bg-color m-4 flex flex-row shadow-2xl">
          <div className="overflow-y-auto rounded-xl my-4 mx-2 w-full">
            <div className="font-sans text-black text-xl font-light tracking-widest text-center ">
              INCOMING MONEY REQUESTS
            </div>
            <div className = "bg-white rorounded-xl">
            {this.props.currentUser.incomingMoneyRequests.map((request) => (
              <IncomingMoneyRequest
                key={uuid()}
                request={request}
                user={this.state.user}
                global={this.props.currentUser}
                balance={this.props.currentUser.currentAccountBalance}
                changeIncomingMoneyRequests={
                  this.props.changeIncomingMoneyRequests
                }
                changeUserBalance={this.props.changeUserBalance}
              />
            
            ))}
                
            </div>
          </div>
          
          
          
          <div className=" overflow-y-auto rounded-xl my-4 mx-2 w-full">
            <div className="font-sans text-black text-xl font-light tracking-widest text-center">
              OUTGOING MONEY REQUESTS
            </div>
            {global.sentMoneyRequests.map((request) => (
              <OutgoingMoneyRequest
                key={uuid()}
                request={request}
                global={this.props.global}
                changeOutgoingMoneyRequests={
                  this.props.changeOutgoingMoneyRequests
                }
              />
            ))}
          </div>
          {/* div for rest of the feed */}
        </div>

        <div className = "bg-white rounded-xl shadow-2xl m-4">
            <UserTransactionTable global = {this.props.global} ></UserTransactionTable>
        </div>
      </div>
    );
  }
}

export default UserFeed;
