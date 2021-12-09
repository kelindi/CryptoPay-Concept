import React, { Component } from "react";
import FriendsList from "./FriendsList";
import NotificationBar from "./NotificationBar/NotificationBar";
import UserFeed from "./UserFeed/UserFeed";
import UserHeader from "./UserHeader/UserHeader";
import { ethers } from "ethers";

class UserDashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: this.props.userData.userBalance,
      userName: this.props.userData.userName,
      firstName: this.props.userData.firstName,
      lastName: this.props.userData.lastName,
      friendsList: this.props.userData.friends,
      provider: this.props.userData.provider,
      signer: this.props.userData.signer,
      wallet: this.props.userData.wallet,
      profilePicture: this.props.userData.profilePicture,
      incomingFriendRequests: this.props.userData.incomingFriendRequests,
      sentFriendRequests: this.props.userData.sentFriendRequests,
      incomingMoneyRequests: this.props.userData.incomingMoneyRequests,
      sentMoneyRequests: this.props.userData.sentMoneyRequests,
      transactions: this.props.userData.transactions,
    };
  }
  componentDidMount = () => {};

  updateUserData = async () => {
    await this.props.user.updateUserData();
    this.setState({
      friendsList: this.props.user.friends,
      incomingFriendRequests: this.props.user.incomingFriendRequests,
      sentFriendRequests: this.props.user.sentFriendRequests,
      incomingMoneyRequests: this.props.user.incomingMoneyRequests,
      sentMoneyRequests: this.props.user.sentMoneyRequests,
      transactions: this.props.user.transactions,
      profilePicture: this.props.user.profilePicture,
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
              changeFriendsList={this.changeFriendsList}
              changeIncomingFriendRequests={this.changeIncomingFriendRequests}
              global={this.state}
            ></NotificationBar>
            <UserHeader
              changeSentMoneyRequests={this.changeSentMoneyRequests}
              changeUserBalance={this.changeUserBalance}
              global={this.state}
              // backend={this.props.backend}
              currentUser={this.props.currentUser}
              useApi={this.props.useApi}
              userData={this.props.userData}
            ></UserHeader>

            <UserFeed
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
              changeUserBalance={this.changeUserBalance}
              changeSentMoneyRequests={this.changeSentMoneyRequests}
              global={this.state}
              changeSentFriendRequests={this.changeSentFriendRequests}
              currentUser={this.state}
              updateUserData={this.updateUserData}
            ></FriendsList>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDashBoard;
