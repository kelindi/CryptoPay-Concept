import cPayRequest from "../CryptoPayClient";

class MoneyRequest {
  constructor(id,originUser, destinationUser,destinationWallet, amount, date) {
    this.id = id;
    this.originUser = originUser;
    this.destinationUser = destinationUser;
    this.destinationWallet = destinationWallet;
    this.amount = amount;
    this.date = date;
    
  }

  deleteRequest() {
    cPayRequest(/moneyRequests/ + this.id, "DELETE");
    return 1;
  }

  cancelRequest() {
    cPayRequest(/moneyRequests/ + this.id, "DELETE");
    return 1;
  }
}

export default MoneyRequest;
