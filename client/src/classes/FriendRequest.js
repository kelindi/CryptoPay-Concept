import cPayRequest from "../CryptoPayClient";

class FriendRequest {
  constructor(id,originUser, destinationUser,date) {
    this.id = id;
    this.originUser = originUser;
    this.destinationUser = destinationUser;
    this.date = date;
    
  }

  deleteRequest() {
    cPayRequest(/friendRequests/ + this.id, "DELETE");
    return 1;
  }

  cancelRequest() {
    cPayRequest(/friendRequests/ + this.id, "DELETE");
    return 1;
  }
}

export default FriendRequest;
