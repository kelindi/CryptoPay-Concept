import React, { Component } from "react";
import FriendRequest from "./FriendRequest";
import SentFriendRequest from "./SentFriendRequest";
import { uuid } from "uuidv4";
import IncomingMoneyRequest from "./TransactionFeed/IncomingMoneyRequest";
import { acceptRequest } from "./FriendRequestResponses";
import OutgoingMoneyRequest from "./TransactionFeed/OutgoingMoneyTransaction";
import UserTransactionTable from "./UserTransactions";
import Loading from "../../Loading";

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
    this.props.changeSentFriendRequests(newSentRequests);
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
      <div className="flex flex-col h-52 pb-4">
        <div className="bg-gray-900 text-custom-100 rounded-xl w-auto bg-color mx-4 flex flex-row shadow-2xl flex-none h-full">
          <div className="rounded-xl my-1 mx-2 w-full">
            <div className="font-sans text-lg font-light tracking-widest text-center">
              INCOMING MONEY REQUESTS
            </div>
            <div className="overflow-y-auto h-3/4">
              {this.props.currentUser.incomingMoneyRequests === null ? (
                <Loading></Loading>
              ) : (
                this.props.currentUser.incomingMoneyRequests.map((request) => (
                  <IncomingMoneyRequest
                    key={uuid()}
                    sendMoney={this.props.sendMoney}
                    request={request}
                    user={this.state.user}
                    updateUser={this.props.updateUser}
                    global={this.props.currentUser}
                    balance={this.props.currentUser.userBalance}
                    changeIncomingMoneyRequests={
                      this.props.changeIncomingMoneyRequests
                    }
                    changeUserBalance={this.props.changeUserBalance}
                  />
                ))
              )}
            </div>
          </div>
          <div className="rounded-xl my-1 mx-2 w-full">
            <div className="font-sans text-lg font-light tracking-widest text-center">
              OUTGOING MONEY REQUESTS
            </div>
            <div className="overflow-y-auto h-3/4">
              {this.props.currentUser.sentMoneyRequests === null ? (
                <Loading></Loading>
              ) : (
                this.props.currentUser.sentMoneyRequests.map((request) => (
                  <OutgoingMoneyRequest
                    key={uuid()}
                    request={request}
                    global={this.props.currentUser}
                    updateUser={this.props.updateUser}
                    changeOutgoingMoneyRequests={
                      this.props.changeOutgoingMoneyRequests
                    }
                  />
                ))
              )}
            </div>
          </div>

          {/* div for rest of the feed */}
        </div>
      </div>
    );
  }
}

export default UserFeed;
