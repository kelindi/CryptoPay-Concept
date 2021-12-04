import User from "./User";
import { uuid } from "uuidv4";
import Admin from "./Admin";
import MoneyRequest from "./MoneyRequest";
import Transaction from "./Transaction";
import Report from "./Report";

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
    this.user5 = new User("firstName5", "lastName5", "user5", 5005, uuid());
    this.user6 = new User("firstName6", "lastName6", "user6", 6006, uuid());
    this.user7 = new User("firstName7", "lastName7", "user7", 7007, uuid());
    this.user8 = new User("firstName8", "lastName8", "user8", 8000, uuid());
    this.user9 = new User("firstName9", "lastName9", "user9", 9000, uuid());
    this.user10 = new User("firstName10", "lastName10", "user10", 10006, uuid());


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
    this.reports = [];
    this.resolvedReports = [];
    this.transactions = [];
    this.moneyRequests = [];
    this.users = [this.user1, this.user2, this.user3, this.user4,this.user5,this.user6,this.user7,this.user8,this.user9,this.user10];
    //set profile pictures
    this.user1.profilePicture = "/images/pf1.jpeg";
    this.user2.profilePicture = "/images/pf2.jpeg";
    this.user3.profilePicture = "/images/pf3.jpeg";
    this.user4.profilePicture = "/images/pf4.jpeg";

    //create and add reports to reports array
    this.reports.push(new Report(this.user1,this.user4,"Spammed me with multiple money requests for no reason","10-01-2021",'20:00'))
    this.reports.push(new Report(this.user2,this.user4,"Sent me money for no reason","10-02-2021",'12:00'))
    this.reports.push(new Report(this.user3,this.user4,"Tried to scam me","10-03-2021",'8:00'))
    

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
    // ============================Incoming and outgoing money requests for user1==========================================
    this.mr3 = new MoneyRequest(this.user2, this.user1, 200, "10-01-2021");
    this.mr4 = new MoneyRequest(this.user3, this.user1, 30, "10-02-2021");
    this.mr5 = new MoneyRequest(this.user3, this.user1, 300, "10-01-2021");
    this.mr6 = new MoneyRequest(this.user1, this.user4, 200, "10-03-2021")
    //========================================================================================================

    this.user1.sentRequests.push(this.mr1)
    this.user2.sentRequests.push(this.mr2)

    // ==============================incoming and outgoing mrs pushed for user1===========================================
    this.user1.requests.push(this.mr3)
    this.user1.requests.push(this.mr4)
    this.user1.requests.push(this.mr5)
    this.user1.sentRequests.push(this.mr6)
    // ======================================================================================================

    this.moneyRequests.push(this.mr1);
    this.moneyRequests.push(this.mr2);
    // ================================ MRs for incoming and outgoing requests for user1==================================
    this.moneyRequests.push(this.mr3)
    this.moneyRequests.push(this.mr4)
    this.moneyRequests.push(this.mr5)
    this.moneyRequests.push(this.mr6)
    // =====================================================================================================
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
    this.user1.friendRequests.push(this.user4,this.user5,this.user6);
    this.user1.sentFriendRequests.push(this.user7,this.user8,this.user9)
  }
  addUser = (firstName, lastName, userName, password) => {
    const url = '/api/register';

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      walletAddress: 'asdasdasd',
      userName: userName
    }

    const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(newUser),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    console.log(request)
    fetch(request)
    .then(function(res) {
      if (res.status === 200){
        console.log("Added new User")
      }
      else if(res.status === 304){
        console.log("Username Taken")
      }
      else{
        console.log("Could not add user")
      }
    }).catch((error) => {
      console.log(error)
    })
    let uid = uuid();
    this.loginDB[userName] = password;
    // this.loginDB.push({
    //     key: username,
    //     value: password
    // });
    this.tokenDB[userName] = uid;
    // this.tokenDB.push({
    //     key: username,
    //     value: uid
    // });
    this.userDB[[uid]] = new User(firstName, lastName, userName, 0, ""); //keeping default balance as 0 and no default wallet.
    // this.userDB.push({
    //     key: [uid],
    //     value: new User(firstName, lastName, username, 0, '') //keeping default balance as 0 and no default wallet.
    // });
    console.log(this.loginDB);
  };

  // addUser = (firstName, lastName, username, password) => {
  //   console.log(this.loginDB);
  //   let uid = uuid();
  //   this.loginDB[username] = password;
  //   // this.loginDB.push({
  //   //     key: username,
  //   //     value: password
  //   // });
  //   this.tokenDB[username] = uid;
  //   // this.tokenDB.push({
  //   //     key: username,
  //   //     value: uid
  //   // });
  //   this.userDB[[uid]] = new User(firstName, lastName, username, 0, ""); //keeping default balance as 0 and no default wallet.
  //   // this.userDB.push({
  //   //     key: [uid],
  //   //     value: new User(firstName, lastName, username, 0, '') //keeping default balance as 0 and no default wallet.
  //   // });
  //   console.log(this.loginDB);
  // };
}

export default Backend;
