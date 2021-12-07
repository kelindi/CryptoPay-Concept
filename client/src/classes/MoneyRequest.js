import cPayRequest from "../CryptoPayClient";

class MoneyRequest {
  constructor(id,originUser, destinationUser,destinationWallet, amount, date) {
    this.id = id;
    this.originUser = originUser;
    this.destinationUser = destinationUser;
    this.destinationWallet = destinationWallet;
    this.amount = amount;
    this.date = date;

    this.incomingFirstName = null;
    this.incomingLastName = null;
    this.outgoingFirstName = null;
    this.outgoingLastName = null;
    
  }

  deleteRequest() {
    cPayRequest(/moneyRequests/ + this.id, "DELETE");
    return 1;
  }

  cancelRequest() {
    cPayRequest(/moneyRequests/ + this.id, "DELETE");
    return 1;
  }

  getIncomingFirstLastName = async() => {
    let {status, data} = await cPayRequest("/api/user/"+this.originUser,'GET');
    console.log(data)
		if(status === 200){
			this.incomingFirstName = data.firstName
      this.incomingLastName = data.lastName
		};
  }

  getOutgoingFirstLastName = async() => {
    let {status, data} = await cPayRequest("/api/user/"+this.destinationUser,'GET');
		if(status === 200){
			this.outgoingFirstName = data.firstName
      this.outgoingLastName = data.lastName
		};
  }

}

export default MoneyRequest;
