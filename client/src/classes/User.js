import cPayRequest from "../CryptoPayClient";
import Friend from "./Friend";
import MoneyRequest from "./MoneyRequest";
import FriendRequest from "./FriendRequest";
import Transaction from "./Transaction";

//uid
class User {
  constructor(
    firstName,
    lastName,
    userName,
    currentAccountBalance,
    walletAddress,
    signer,
    provider
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
	if (currentAccountBalance) {
		this.currentAccountBalance = currentAccountBalance;
	}
	else {
		this.currentAccountBalance = null;
	}
    if (walletAddress) {
      this.walletAddress = walletAddress;
    } else {
      this.walletAddress = null;
    }
    if (signer) {
      this.signer = signer;
    } else {
      this.signer = null;
    }
    if (provider) {
      this.provider = provider;
    } else {
      this.provider = null;
    }

    // all this cannot be initialized when there is a backend, purely exposed for testing purposes
    this.friendsList = [];
    this.transactions = [];
    this.sentMoneyRequests = [];
    this.incomingMoneyRequests = [];
    this.sentFriendRequests = [];
    this.incomingFriendRequests = [];
    this.profilePicture =
      "https://avatars.dicebear.com/api/bottts/" + userName + ".png"; // this value will be passed in as default valur
  }

  updateData = async () => {
    const { status, data } = await cPayRequest(
      "/api/user/data/" + this.userName.toString(),
      "GET"
    );
    if (status === 200) {
      this.incomingMoneyRequests = [];
      data.incomingMoneyRequests.forEach(async (request) => {
        const mr = new MoneyRequest(
          request._id,
          request.originUser,
          request.destinationUser,
          request.destinationWallet,
          request.amount,
          request.date
        );
        this.incomingMoneyRequests.push(mr);
        await mr.getIncomingFirstLastName();
      });
      this.sentMoneyRequests = [];
      data.sentMoneyRequests.forEach(async (request) => {
        const mr = new MoneyRequest(
          request._id,
          request.originUser,
          request.destinationUser,
          request.destinationWallet,
          request.amount,
          request.date
        );
        this.sentMoneyRequests.push(mr);
        await mr.getOutgoingFirstLastName();
      });

      this.incomingFriendRequests = [];
      data.incomingFriendRequests.forEach(async (request) => {
        const fr = new FriendRequest(
          request._id,
          request.originUser,
          request.destinationUser,
          request.date
        );
        this.incomingFriendRequests.push(fr);
        await fr.getIncomingFirstLastName();
      });

      this.sentFriendRequests = [];
      data.sentFriendRequests.forEach(async (request) => {
        const fr = new FriendRequest(
          request._id,
          request.originUser,
          request.destinationUser,
          request.date
        );
        this.sentFriendRequests.push(fr);
        await fr.getOutgoingFirstLastName();
      });

      this.friendsList = [];
      // create new friend for each friend in data.friends and push it to friendsList
      data.friends.forEach(async (friend) => {
        const f = new Friend(
          friend.firstName,
          friend.lastName,
          friend.userName,
          friend.walletAddress,
          friend.profilePicture,
          friend.walletAddress
        );
        this.friendsList.push(f);
      });

      this.transactions = [];
      data.transactions.forEach((transaction) => {
        this.transactions.push(
          new Transaction(
            transaction.originUser,
            transaction.destinationUser,
            transaction.amount,
            transaction.date,
            transaction.time,
            transaction._id
          )
        );
      });
    }
    return { status: status, newUser: this };
  };

  //TODO
  requestMoney = async () => {
    const { status, data } = await cPayRequest("moneyRequests/", "POST", {
      originuser: this.userName,
      destinationuser: this.userName,
      destinationwallet: this.walletAddress,
      amount: this.amount,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    });
    if (status !== 200) {
      console.log(data);
    }
    await this.updateData();
  };

  requestFriend = async (friendUserName) => {
    const { status, data } = await cPayRequest("friendRequests/", "POST", {
      orginUser: this.userName,
      destinationUser: friendUserName,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    });
    if (status !== 200) {
      console.log(data);
    }
    await this.updateData();
  };

  addWalletaddress = async () => {
    const { status, data } = await cPayRequest(
      "/users/updateWalletAddress/" + this.userName,
      "PATCH",
      { walletAddress: this.walletAddress }
    );
    if (status !== 200) {
      console.log(data);
    }
    await this.updateData();
  };
}

export default User;
