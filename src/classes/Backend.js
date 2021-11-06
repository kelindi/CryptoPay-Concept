import User from "./User";
import { uuid } from "uuidv4";
import Admin from "./Admin";
import MoneyRequest from "./MoneyRequest";
import Transaction from "./Transaction";

class Backend {
  constructor() {
    //fill hardcoded database
    this.u1 = uuid();
    this.u2 = uuid();
    this.u3 = uuid();
    this.u4 = uuid();
    this.adminID = uuid();
    this.user1 = new User("firstName", "lastName", "user", 1001, uuid());
    this.user2 = new User("firstName2", "lastName2", "user2", 2002, uuid());
    this.user3 = new User("firstName3", "lastName3", "user3", 3003, uuid());
    this.user4 = new User("firstName4", "lastName4", "user4", 4004, uuid());
    this.admin = new Admin("adminFirst", "adminLast");
    this.loginDB = {
      user: "user",
      user2: "user2",
      user3: "user3",
      user4: "user4",
      admin: "admin",
    };
    this.tokenDB = {
      user: this.u1,
      user2: this.u2,
      user3: this.u3,
      user4: this.u4,
      admin: this.adminID,
    };
    this.userDB = {
      [this.u1]: this.user1,
      [this.u2]: this.user2,
      [this.u3]: this.user3,
      [this.u4]: this.user4,
      [this.adminID]: this.admin,
    };
    this.transactions = [];
    this.moneyRequests = [];
    this.users = [this.user1, this.user2, this.user3, this.user4];
    //set profile pictures
    this.user1.profilePicture = "/images/pf1.jpeg";
    this.user2.profilePicture = "/images/pf2.jpeg";
    this.user3.profilePicture = "/images/pf3.jpeg";
    this.user4.profilePicture = "/images/pf4.jpeg";

    // add transactions to user1
    this.tr1 = new Transaction(
      this.user1,
      this.user2,
      100,
      "9-02-2021",
      "13:20"
    );
    this.tr2 = new Transaction(
      this.user1,
      this.user2,
      102,
      "9-14-2021",
      "14:20"
    );
    this.tr3 = new Transaction(
      this.user1,
      this.user2,
      103,
      "9-17-2021",
      "9:20"
    );
    this.tr4 = new Transaction(
      this.user1,
      this.user3,
      100,
      "9-18-2021",
      "13:20"
    );
    this.tr5 = new Transaction(
      this.user1,
      this.user3,
      102,
      "9-19-2021",
      "14:20"
    );
    this.tr6 = new Transaction(
      this.user1,
      this.user3,
      103,
      "9-20-2021",
      "9:20"
    );
    this.tr7 = new Transaction(
      this.user2,
      this.user1,
      100,
      "9-21-2021",
      "13:20"
    );
    this.tr8 = new Transaction(
      this.user2,
      this.user1,
      100,
      "9-22-2021",
      "13:20"
    );
    this.tr9 = new Transaction(
      this.user2,
      this.user1,
      100,
      "9-23-2021",
      "13:20"
    );

    this.mr1 = new MoneyRequest(this.user1, this.user2, 100, "10-01-2021");
    this.mr2 = new MoneyRequest(this.user1, this.user3, 100, "10-02-2021");

    this.moneyRequests.push(this.mr1);
    this.moneyRequests.push(this.mr2);
    this.transactions.push(this.tr1);
    this.transactions.push(this.tr2);
    this.transactions.push(this.tr3);
    this.transactions.push(this.tr4);
    this.transactions.push(this.tr5);
    this.transactions.push(this.tr6);
    this.transactions.push(this.tr7);
    this.transactions.push(this.tr8);
    this.transactions.push(this.tr9);

    this.transactions.push(
      new Transaction(this.user2, this.user3, 193, "7-11-2021", "7:20")
    );
    this.transactions.push(
      new Transaction(this.user2, this.user1, 123, "5-11-2021", "8:05")
    );
    this.transactions.push(
      new Transaction(this.user2, this.user4, 2003, "7-15-2021", "15:09")
    );
    this.transactions.push(
      new Transaction(this.user2, this.user1, 3, "4-30-2021", "16:08")
    );
    this.transactions.push(
      new Transaction(this.user2, this.user4, 21, "4-18-2021", "1:20")
    );
    this.transactions.push(
      new Transaction(this.user2, this.user3, 900, "5-17-2021", "6:50")
    );

    this.transactions.push(
      new Transaction(this.user3, this.user4, 193, "7-11-2021", "7:20")
    );
    this.transactions.push(
      new Transaction(this.user3, this.user1, 123, "5-11-2021", "8:05")
    );
    this.transactions.push(
      new Transaction(this.user3, this.user4, 2003, "7-15-2021", "15:09")
    );
    this.transactions.push(
      new Transaction(this.user3, this.user1, 3, "4-30-2021", "16:08")
    );
    this.transactions.push(
      new Transaction(this.user3, this.user2, 21, "4-18-2021", "1:20")
    );
    this.transactions.push(
      new Transaction(this.user3, this.user4, 900, "5-17-2021", "6:50")
    );

    this.transactions.push(
      new Transaction(this.user4, this.user3, 193, "7-11-2021", "7:20")
    );
    this.transactions.push(
      new Transaction(this.user4, this.user1, 123, "5-11-2021", "8:05")
    );
    this.transactions.push(
      new Transaction(this.user4, this.user1, 2003, "7-15-2021", "15:09")
    );
    this.transactions.push(
      new Transaction(this.user4, this.user1, 3, "4-30-2021", "16:08")
    );
    this.transactions.push(
      new Transaction(this.user4, this.user2, 21, "4-18-2021", "1:20")
    );
    this.transactions.push(
      new Transaction(this.user4, this.user3, 900, "5-17-2021", "6:50")
    );

    this.user1.friends.push(this.user2);
    this.user1.friends.push(this.user3);
    this.user1.friendRequests.push(this.user4);
  }
  addUser = (firstName, lastName, username, password) => {
    console.log(this.loginDB);
    let uid = uuid();
    this.loginDB[username] = password;
    // this.loginDB.push({
    //     key: username,
    //     value: password
    // });
    this.tokenDB[username] = uid;
    // this.tokenDB.push({
    //     key: username,
    //     value: uid
    // });
    this.userDB[[uid]] = new User(firstName, lastName, username, 0, ""); //keeping default balance as 0 and no default wallet.
    // this.userDB.push({
    //     key: [uid],
    //     value: new User(firstName, lastName, username, 0, '') //keeping default balance as 0 and no default wallet.
    // });
    console.log(this.loginDB);
  };
}

export default Backend;
