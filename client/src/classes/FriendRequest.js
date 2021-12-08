import cPayRequest from "../CryptoPayClient";

class FriendRequest {
  constructor(id,originUser, destinationUser,date) {
    this.id = id;
    this.originUser = originUser;
    this.destinationUser = destinationUser;
    this.date = date;
    // My code
    this.destinationFirstName = null;
    this.destinationLastName = null;
    this.originFirstName = null;
    this.originLastName = null;
  }

  deleteRequest() {
    cPayRequest(/friendRequests/ + this.id, "DELETE");
    return 1;
  }

  cancelRequest() {
    cPayRequest(/friendRequests/ + this.id, "DELETE");
    return 1;
  }

  // My code 
  getIncomingFirstLastName = async() => {
    let {status, data} = await cPayRequest("/api/user/"+this.originUser,'GET');
    console.log(data)
		if(status === 200){
			this.originFirstName = data.firstName
      this.originLastName = data.lastName
		};
  }

  getOutgoingFirstLastName = async() => {
    let {status, data} = await cPayRequest("/api/user/"+this.destinationUser,'GET');
		if(status === 200){
			this.destinationFirstName = data.firstName
      this.destinationLastName = data.lastName
		};
  }
}

export default FriendRequest;
