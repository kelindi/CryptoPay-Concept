
import { uuid } from "uuidv4";

class MoneyRequest {
  constructor(originUser, destinationUser, amount, date) {
    this.originUser = originUser;
    this.destinationUser = destinationUser;
    this.amount = amount;
    this.date = date;
    this.id = uuid();
  }

  acceptRequest() {
    // let the destination user accept this request, trigger a transaction

    return 1;
  }

  cancelRequest() {
    //let the origin user delete the request
    return 1;
  }
}

export default MoneyRequest;
