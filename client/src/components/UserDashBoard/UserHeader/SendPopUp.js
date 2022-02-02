import React, { Component } from "react";
import cPayRequest from "../../../CryptoPayClient";

class SendPopUp extends Component {
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

  sendMoney = async () => {
    if (this.state.validAmount && this.state.nameFilled) {
      // Trigger a transaction
      // is currentUser an object or id
      if (this.props.global.userBalance - this.state.amount >= 0) {
        // update the balance  (NEEDS TO BE CONNECTED TO METAMASK in USERHEADER?USERDASHBOARD)
        // this.props.updateBalance(this.state.amount)
        let { status, data } = await cPayRequest(
          "/api/user/" + this.props.currentUser.userName + "/friends",
          "get"
        );
        let receiver = data.filter((friend) =>
          friend.userName
            .toString()
            .includes(this.state.moneyReceiver.toString())
        );
        let rWalletAddress = receiver[0].walletAddress;
        let transactionSent = await this.props.sendMoney(
          rWalletAddress,
          this.state.amount
        );
        if (transactionSent) {
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, "0");
          let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = today.getFullYear();

          let h = String(today.getHours());
          let m = String(today.getMinutes()).padStart(2, "0");

          let date = yyyy + "-" + mm + "-" + dd;
          let time = h + ":" + m;
          let body = {
            originUser: this.state.currentUser,
            destinationUser: this.state.moneyReceiver,
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
      this.props.minimizeSend();
    } else if (!this.state.nameFilled) {
      alert("Please enter a valid username");
    } else {
      alert("Please enter a valid amount");
    }
  };

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
    console.log(this.props.friendsList);
    return (
      <div className="bg-transparent w-screen h-screen shadow-lg fixed top-0 left-0 z-50">
        <div className="bg-custom-100 shadow-lg fixed z-100 left-1/3 top-1/4 rounded-xl">
          <div className="">
            <div className="relative py-1 px-2 flex flex-row text-center items-center justify-center border-b">
              <span className="font-medium tracking-wide text-gray-900 text-2xl">
                Send
              </span>
            </div>
          </div>
          <div className="bg-custom-100 md:text-base text-sm border-b p-2 h-48 rounded-b-xl">
            <div className="">
              <div className="flex text-center h-32 border-b">
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
                className="bg-blue-500 hover:bg-blue-600 text-white font-light py-1 px-5 rounded-full hover:border-blue"
                onClick={this.sendMoney}
              >
                <b>Send</b>
              </button>
              <button
                className="ml-1 bg-gray-200 hover:bg-gray-300 text-black font-light py-1 px-5 rounded-full hover:border-blue"
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

export default SendPopUp;
