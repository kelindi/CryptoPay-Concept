import React, { Component } from "react";
import FriendsList from "./FriendsList";
import NotificationBar from "./NotificationBar/NotificationBar";
import UserFeed from "./UserFeed/UserFeed";
import UserHeader from "./UserHeader/UserHeader";
import FriendRequest from "../../classes/FriendRequest";
import { ethers } from "ethers";
import { uuid } from "uuidv4";

class UserDashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: this.props.currentUser.currentAccountBalance,
      userName: this.props.currentUser.userName,
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      friendsList: this.props.currentUser.friendsList,
      provider: this.props.currentUser.provider,
      signer: this.props.currentUser.signer,
      wallet: this.props.currentUser.walletAddress,
      profilePicture: this.props.currentUser.profilePicture,
      incomingFriendRequests: this.props.currentUser.incomingFriendRequests,
      sentFriendRequests: this.props.currentUser.sentFriendRequests,
      incomingMoneyRequests: this.props.currentUser.incomingMoneyRequests,
      sentMoneyRequests: this.props.currentUser.sentMoneyRequests,
      transactions: this.props.currentUser.transactions,
      update: 0,
      user: this.props.currentUser,
    };
  }
  componentDidMount = () => {
    console.log(this.props)
  };

  updateUserData = async () => {
    let newUser = await this.state.user.updateData();
    console.log("hhhh")
    console.log(newUser);
    this.setState({
      user: newUser,
      friendsList: newUser.friendsList,
      incomingFriendRequests: newUser.incomingFriendRequests,
      sentFriendRequests: newUser.sentFriendRequests,
      incomingMoneyRequests: newUser.incomingMoneyRequests,
      sentMoneyRequests: newUser.sentMoneyRequests,
      transactions: newUser.transactions,
      profilePicture: newUser.profilePicture,
    });
  };

  setUpWeb3 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = await signer.getAddress();
    let userBalance = await provider.getBalance(wallet);
    userBalance = ethers.utils.formatEther(userBalance);

    this.setState({
      provider: provider,
      signer: signer,
      wallet: wallet,
      userBalance: userBalance,
    });
    this.setUserData();
  };

  setUserData = async () => {
    let firstName = "firstName";
    let lastName = "lastName";
    let userName = this.props.currentUser;
    const { status, data } = await this.props.useApi(
      "post",
      "/user/getUserData",
      userName
    );
    if (status === 200) {
      userName = data.userName;
      firstName = data.firstName;
      lastName = data.lastName;
    }

    this.setState({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    });
  };

  changeUserBalance = (x) => {
    this.setState({ userBalance: x });
  };

  changeUserName = (x) => {
    this.setState({ userName: x });
  };

  changeFirstName = (x) => {
    this.setState({ FirstName: x });
  };

  changeLastName = (x) => {
    this.setState({ LastName: x });
  };

  changeProfilePicture = (x) => {
    this.setState({ profilePicture: x });
  };

  changeFriendsList = (x) => {
    this.setState({ friendsList: x });
  };

  changeIncomingFriendRequests = (x) => {
    this.setState({ incomingFriendRequests: x });
  };

  changeSentFriendRequests = (x) => {
    this.setState({ sentFriendRequests: x });
  };

  changeIncomingMoneyRequests = (x) => {
    this.setState({ incomingMoneyRequests: x });
  };

  changeSentMoneyRequests = (x) => {
    this.setState({ sentMoneyRequests: x });
  };

  sendMoneyRequest = async (body) => {
    await this.props.useApi("post", "/moneyRequests", body);
    const { status, data } = await this.props.useApi(
      "get",
      "/moneyRequests/" + this.state.userName
    );
    if (status === 200) {
      this.setState({ incomingMoneyRequests: data });
    }
  };
  sendFriendRequest = async (body) => {
    await this.props.useApi("post", "/friendRequests", body);
    const { status, data } = await this.props.useApi(
      "get",
      "/friendRequests/" + this.state.userName
    );
    if (status === 200) {
      this.setState({ incomingFriendRequests: data });
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="font-serif bg-gray-900 overflow-hidden">
        <div className="flex flex-column h-100">
          <div className="w-10/12  h-screen flex-shrink-0 flex-grow-0">
            <NotificationBar
              key={this.state}
              changeFriendsList={this.changeFriendsList}
              changeIncomingFriendRequests={this.changeIncomingFriendRequests}
              global={this.state}
            ></NotificationBar>
            <UserHeader
              key = {this.state}
              changeSentMoneyRequests={this.changeSentMoneyRequests}
              changeUserBalance={this.changeUserBalance}
              global={this.state}
              // backend={this.props.backend}
              currentUser={this.state}
              useApi={this.props.useApi}
              userData={this.props.userData}
            ></UserHeader>

            <UserFeed
              key={this.state}
              changeSentFriendRequests={this.changeSentFriendRequests}
              global={this.state}
              changeOutgoingMoneyRequests={this.changeSentMoneyRequests}
              changeIncomingMoneyRequests={this.changeIncomingMoneyRequests}
              changeUserBalance={this.changeUserBalance}
              changeFriendsList={this.changeFriendsList}
              changeIncomingFriendRequests={this.changeIncomingFriendRequests}
              currentUser={this.state}
            ></UserFeed>
          </div>
          <div className="w-2/12 min-w-min flex-shrink-0 flex-grow-0">
            <FriendsList
              updateUserData={this.updateUserData}
              key={this.state}
              user={this.state}
            ></FriendsList>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDashBoard;
