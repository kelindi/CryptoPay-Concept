import React, { Component } from "react";
import Transaction from "../../../classes/Transaction";
import MoneyRequest from "../../../classes/MoneyRequest";
import cPayRequest from "../../../CryptoPayClient";

class RequestPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      moneyReceiver: "",
      validAmount: false,
      currentUser: this.props.currentUser.userName,
      filteredFriends: this.props.friendsList,
      showResults: false,
      nameFilled: false,
    };
    this.amountValidation = this.amountValidation.bind(this);
    // this.setMoneyReceiver = this.setMoneyReceiver(this)
    // this.setFilteredFriends = this.setFilteredFriends(this)
  }

  sendRequest = async () => {
    if (this.state.validAmount && this.state.nameFilled) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = String(today.getFullYear());
      let h = String(today.getHours());
      let m = String(today.getMinutes()).padStart(2, "0");
      let date = yyyy + "/" + mm + "/" + dd;
      let time = h + ":" + m;
      // find wallet address of reciever
      let { status, data } = await cPayRequest(
        "/api/user/" + this.props.global.userName + "/friends",
        "get"
      );
      let rWalletAddress = data.filter((friends) =>
        friends.userName
          .toString()
          .includes(this.state.moneyReceiver.toString())
      )[0].walletAddress;

      let body = {
        originUser: this.props.global.userName,
        destinationUser: this.state.moneyReceiver,
        destinationWallet: rWalletAddress,
        amount: this.state.amount,
        date: date,
      };
      console.log(JSON.stringify(body));
      cPayRequest("/moneyRequests", "post", body);
      console.log("done");
    }
    this.props.updateData()
    this.props.minimizeSend();
    // Add cases where not valid amount/username and display error on screen
  };

  minimizePopUp = () => {
    this.props.minimizeSend();
  };

  maxmizePopUp = () => {
    this.props.maximizeSend();
  };

  amountValidation(event) {
    const amount = event.target.value;
    if (!isNaN(+amount)) {
      this.setState({ amount: amount }, this.setState({ validAmount: true }));
    }
  }

  setMoneyReceiver = (event) => {
    console.log(this.props.friendsList[0]);
    if (
      this.props.global.friendsList.filter(
        (friend) => friend.userName === event.target.value
      ).length > 0
    ) {
      this.setState(
        { moneyReceiver: event.target.value, nameFilled: true },
        this.setFilteredFriends
      );
    } else {
      this.setState(
        { moneyReceiver: event.target.value, nameFilled: false },
        this.setFilteredFriends
      );
    }
  };

  setFilteredFriends = () => {
    if (this.state.moneyReceiver === "") {
      this.setState(
        { showResults: false },
        this.setState({ filteredFriends: [] })
      );
    } else {
      this.setState(
        {
          filteredFriends: this.props.global.friendsList.filter((friends) =>
            friends.userName
              .toString()
              .includes(this.state.moneyReceiver.toString())
          ),
        },
        this.setState({ showResults: true })
      );
    }
  };

  pasteOption = (friend) => {
    this.setState({
      showResults: !this.state.showResults,
      filteredFriends: [],
      moneyReceiver: friend.userName,
      nameFilled: true,
    });
  };

  render() {
    return (
        <div className="bg-transparent w-screen h-screen shadow-lg fixed top-0 left-0 z-50">
        <div className="bg-gray-800 shadow-lg fixed z-100 left-1/3 top-1/4 rounded-xl">
          <div className="">
            <div className="relative py-1 px-2 flex flex-row text-center items-center justify-center">
              <span className="font-medium tracking-wide text-custom-100 text-2xl">
                Request
              </span>
            </div>
          </div>
          <div className="bg-gray-900 md:text-base text-sm p-2 h-48 rounded-b-xl">
            <div className="">
              <div className="flex text-center h-32">
                <div className="inline h-1/3 mx-2 my-2">
                  <input
                    className={
                      "bg-gray-800 text-gray-200 w-48 pl-2 py-1 outline-none z-75 shadow-xl " +
                      (this.state.showResults && this.state.filteredFriends.length > 0 ? "rounded-t-md" : "rounded-md")
                    }
                    value={this.state.moneyReceiver}
                    onClick={() =>
                      this.setState({ showResults: !this.state.showResults })
                    }
                    onChange={this.setMoneyReceiver}
                    placeholder="User"
                  />
                  {this.state.showResults && this.state.filteredFriends.length > 0 ? (
                    <div className="relative">
                      <div className="w-48 max-h-32 opacity-100 bg-gray-800 text-warm-gray-300 absolute z-75 rounded-b-md overflow-y-auto">
                        <ul className="flex flex-col text-left">
                          {this.state.filteredFriends.map((friend) => {
                            return (
                              <li
                                className="hover:bg-warm-gray-300 hover:text-gray-800"
                                onClick={() => this.pasteOption(friend)}
                              >
                                <img
                                  class="h-8 w-8 rounded-full object-cover mx-1 inline"
                                  src={friend.profilePicture}
                                ></img>

                                <button value={friend.userName}>
                                  {friend.userName}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div
                        className="w-screen h-screen top-0 left-0 fixed"
                        onClick={() =>
                          this.setState({
                            showResults: !this.state.showResults,
                          })
                        }
                      ></div>
                    </div>
                  ) : null}
                  {/* {this.state.searchOn ? <FriendFinder displayHTML={this.state.displayHTML}/>:null} */}
                </div>

                <div className="inline h-1/3 mx-2 my-2">
                  <form>
                    <label>
                    <img className = "h-full w-4 inline"alt="ETH" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="24"/>
                      <input
                        className="bg-gray-800 text-gray-200 w-32 pl-2 py-1 outline-none rounded-md shadow-lg ml-2"
                        type="text"
                        value={this.state.amount}
                        onChange={this.amountValidation}
                        placeholder="amount"
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-1/1 mt-2 text-right">
              <button
                className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full"
                onClick={this.sendRequest}
              >
                <b>Request</b>
              </button>
              <button
                className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full"
                onClick={this.minimizePopUp}
              >
                <b>Cancel</b>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-80 w-full h-full" onClick={this.minimizePopUp}></div>
      </div>
    );
  }
}

export default RequestPopUp;
