/* server.js for react-express-authentication */
"use strict";

// LATER
// /* Server environment setup */
// // To run in development mode, run normally: node server.js
// // To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// // To run in production mode, run in terminal: NODE_ENV=production node server.js
// const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

// const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
// const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
// const TEST_USER_EMAIL = 'test@user.com'
// //////

const log = console.log;
const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
// starting the express server
const app = express();

// LATER
// // enable CORS if in development, for React local development server to connect to the web server.
// const cors = require('cors')
// if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
// mongoose.set('useFindAndModify', false); // for some deprecation issues
mongoose.set("bufferCommands", false);

// import the mongoose models
const { User } = require("./models/User_Model");
const { Transaction } = require("./models/Transaction_schema");
const { MoneyRequest } = require("./models/MoneyRequest_schema");
const { Report } = require("./models/Report_schema");
const { FriendRequest } = require("./models/FriendRequestModel");



// to validate object IDs
// const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// LATER
// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require("connect-mongo"); // to store session information on the database in production

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

// LATER
// // middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

// // Middleware for authentication of resources
const authenticate = (req, res, next) => {
  //     if (env !== 'production' && USE_TEST_USER)
  //         req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(401).send("Unauthorized");
      });
  } else {
    res.status(401).send("Unauthorized");
  }
};

// const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

// /*** Session handling **************************************/
// // Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);


/*********************************************************/

/*** API Routes below ************************************/


app.post("/api/register", mongoChecker, async (req, res) => {
  log(req.body);

  const userNameValid = await User.validateUserName(req.body.userName);

  if (userNameValid) {
    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName.toLowerCase(),
      password: req.body.password,
      walletAddress: "none"
    });
    
    try {
      // Save the user
      const newUser = await user.save();
      res.send(newUser);
    } catch (error) {
      if (isMongoError(error)) {
        // check for if mongo server suddenly disconnected before this request.
        res.status(500).send("Internal server error");
      } else {
        log(error);
        res.status(400).send("Bad Request"); // bad request for changing the student.
      }
    }
  } else {
    res.status(304).send("Username Taken");
    return;
  }
});
//Login User
app.post("/api/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  // log(email, password);
  // Use the static method on the User model to find a user
  // by their email and password
  User.findByUserNamePassword(userName, password)
    .then((user) => {
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.userName = user.userName; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
      req.session.isAdmin = user.isAdmin;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.walletAddress = user.walletAddress;
      res.send({ currentUser: user.userName,isAdmin:user.isAdmin });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

//new start
app.get('/users/logout', (req, res) => {
  req.session.destroy((error) => {
    if(error){
      res.status(500).send(error)
    } else{
      res.redirect('/')
    }
  })
})

app.get("/users/check-session", (req, res) => {
  if (req.session.user) {
      res.send({ firstName: req.session.firstName, lastName: req.session.lastName, userName: req.session.userName, isAdmin: req.session.isAdmin });
  } else {
      res.status(401).send();
  }
});
//new end

// AbhiC Start
//get all users
app.get("/users", mongoChecker, async (req, res) => {
  try {
      const users = await User.find({});
      res.send(users);
  } catch (error) {
      log(error);
      res.status(500).send("Internal Server Error");  
  }   
});
// AbhiC End

//get all userName, firstName, lastName, and pf for all users
app.get("/api/users/all", mongoChecker, async (req, res) => {
  try {
      const users = await User.find({});
      const userNames = users.map((user) => {
          return {
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              pf: user.pf
          }
      });
      res.send(userNames);
  } catch (error) {
      log(error);
      res.status(500).send("Internal Server Error");
  }
});
//get all userdata
app.get("/api/user/data/:userName", mongoChecker, async (req, res) => {
  try {
      const user = await User.findOne({userName: req.params.userName});
      //find all friendRequests with the originUser as the userName
      const sentfriendRequests = await FriendRequest.find({originUser: user.userName});
      //find all friendRequests with the targetUser as the userName
      const incomingfriendRequests = await FriendRequest.find({destinationUser: user.userName});
      //find all moneyRequests with the originUser as the userName
      const sentMoneyRequests = await MoneyRequest.find({originUser: user.userName});
      //find all moneyRequests with the targetUser as the userName
      const incomingMoneyRequests = await MoneyRequest.find({destinationUser: user.userName});
      //find all transactions with the originUser as the userName or the detinationUser as the userName
      const transactions = await Transaction.find({$or: [{originUser: user.userName}, {destinationUser: user.userName}]});
      const friends = await Promise.all(
        user.friends.map(async (friend) => {
          const friendUser = await User.findOne({ _id: friend });
          return {
            userName: friendUser.userName,
            firstName: friendUser.firstName,
            lastName: friendUser.lastName,
            walletAddress: friendUser.walletAddress,
          };
        })
      );
      //send all this data
      res.send({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        walletAddress: user.walletAddress,
        friends: friends,
        sentFriendRequests: sentfriendRequests,
        incomingFriendRequests: incomingfriendRequests,
        sentMoneyRequests: sentMoneyRequests,
        incomingMoneyRequests: incomingMoneyRequests,
        transactions: transactions,
      });
  } catch (error) {

      log(error);
      res.status(500).send("Internal Server Error");
  }
});







//get user data (except friends ) for given userName
app.get("/api/user/:userName", authenticate,async (req, res) => {
    try {
      const user = await User.findOne({
        userName: req.params.userName.toLowerCase()
      });
      res.send({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        walletAddress: user.walletAddress,
      });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

//get user friends for given userName
app.get("/api/user/:userName/friends", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.params.userName.toLowerCase()
    });
    // for each friend in user.friends, find the user with that userName
    const friends = await Promise.all(
      user.friends.map(async (friend) => {
        const friendUser = await User.findOne({ _id: friend });
        return {
          userName: friendUser.userName,
          firstName: friendUser.firstName,
          lastName: friendUser.lastName,
          walletAddress: friendUser.walletAddress,
        };
      })
    );
    res.send(friends);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//delete user
app.delete("/users/delete/:userName", mongoChecker, async (req, res) => {
  try {
      await User.findOneAndDelete({
        userName: req.params.userName.toLowerCase()
      });
      res.send("User Deleted");
  } catch (error) {
      if (error.name === "CastError") {
          res.status(404).send("Resource not found");
      } else {
          log(error);
          res.status(500).send("Internal Server Error");
      }
  }
});

//update user walletAddress for given userName
//request body expect
// {
//     walletAddress: <walletAddress>
// }
app.post(
  "/users/updateWalletAddress/:userName",
  mongoChecker,
  async (req, res) => {
    try {
      const user = await User.findOne({
        userName: req.params.userName.toLowerCase(),
      });
      user.walletAddress = req.body.walletAddress;
      await user.save();
      res.send(user);
    } catch (error) {
      if (error.name === "CastError") {
        res.status(404).send("Resource not found");
      } else {
        log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

//update user firstName, userName, lastName for given userName
//request body expects
// {
//     firstName: <firstName>
//     lastName: <lastName>
//     userName: <userName> 
// }
app.patch(
  "/users/updateAll/:userName",
  mongoChecker,
  async (req, res) => {
    try {
      const user = await User.findOne({
        userName: req.params.userName.toLowerCase(),
      });
      console.log(req.body)
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.userName = req.body.userName
      await user.save();
      res.send(user);
    } catch (error) {
      if (error.name === "CastError") {
        res.status(404).send("Resource not found");
      } else {
        log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

//update user firstName for given userName
//request body expects
// {
//     firstName: <firstName>
// }
app.patch(
  "/users/updateFirstName/:userName",
  mongoChecker,
  async (req, res) => {
    try {
      const user = await User.findOne({
        userName: req.params.userName.toLowerCase(),
      });
      user.firstName = req.body.firstName;
      await user.save();
      res.send(user);
    } catch (error) {
      if (error.name === "CastError") {
        res.status(404).send("Resource not found");
      } else {
        log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

//update user lastName for given userName
//request body expects
// {
//     "lastName": <lastName>
// }
app.patch("/users/updateLastName/:userName", mongoChecker, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.params.userName.toLowerCase(),
    });
    user.lastName = req.body.lastName;
    await user.save();
    res.send(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Resource not found");
    } else {
      log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

//update user userName for given userName
//request body expects
// {
//     userName: <userName>
// }
app.patch(
  "/users/updateUserName/:userName",
  mongoChecker,
  async (req, res) => {
    try {
      const user = await User.findOne({
        userName: req.params.userName.toLowerCase(),
      });
      user.userName = req.body.userName;
      await user.save();
      res.send(user);
    } catch (error) {
      if (error.name === "CastError") {
        res.status(404).send("Resource not found");
      } else {
        log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);
//add friend to user
// request body expects
// {
//     "friendUserName": <userName>
// }
app.post("/users/addFriend/:userName", mongoChecker, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.params.userName.toLowerCase(),
    });
    //find friendUserName objectId
    const friendUser = await User.findOne({
      userName: req.body.friendUserName.toLowerCase(),
    });
    //add friendUserName objectId to friends array
    user.friends.push(friendUser._id);
    await user.save();
    //find userName by friendUser._id
    const friend = await User.findOne({
      _id: friendUser._id,
    });
    friend.friends.push(user._id);
    await friend.save();

    res.send(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Resource not found");
    } else {
      log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
//remove friend from user
//remove the objectId of the given userName to the friends array of the given userName
// request body expects
// {
//     "friendUserName": <userName>
// }
app.patch("/users/removeFriend/:userName", mongoChecker, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.params.userName.toLowerCase(),
    });
    //find friendUserName objectId
    const friendUser = await User.findOne({
      userName: req.body.friendUserName.toLowerCase(),
    });
    //remove friendUserName objectId from friends array
    user.friends.pull(friendUser._id);
    await user.save();
    res.send(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Resource not found");
    } else {
      log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
 
//create new friendRequest
//request body expects
// {
// originUser: <userName>,
// destinationUser: <userName>,
// amount:  <amount>,
// date: <date>
// }
app.post("/friendRequests", mongoChecker, async (req, res) => {
    try {
        const friendRequest = new FriendRequest({
            originUser: req.body.originUser,
            destinationUser: req.body.destinationUser,
            date: req.body.date
        });
        await friendRequest.save();
        res.send(friendRequest);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

//delete friendRequest
app.delete("/friendRequests/:id", mongoChecker, async (req, res) => {
    try {
        let a = await FriendRequest.findByIdAndDelete(req.params.id);
        res.send(a);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);    
            res.status(500);
        }
    }
});

//get all friendRequests
app.get("/friendRequests", mongoChecker, async (req, res) => {
    try {
        const friendRequests = await FriendRequest.find({});
        res.send(friendRequests);
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

//get user incoming friendRequests
app.get("/friendRequests/incoming/:userName", mongoChecker, async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.params.userName.toLowerCase(),
        });
        const friendRequests = await FriendRequest.find({
            destinationUser: user.userName,
        });
        res.send(friendRequests);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});
//get user outgoing friendRequests
app.get("/friendRequests/outgoing/:userName", mongoChecker, async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.params.userName.toLowerCase(),
        });
        const friendRequests = await FriendRequest.find({
            originUser: user.userName,
        });
        res.send(friendRequests);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});


//create new moneyRequest
//request body expects
// {
// originUser: <userName>,
// destinationUser: <userName>,
// destinationWallet: <walletAddress>,
// amount:  <amount>,
// date: <date>
// }
app.post("/moneyRequests", mongoChecker, async (req, res) => {
    try {
        const moneyRequest = new MoneyRequest({
            originUser: req.body.originUser,
            destinationUser: req.body.destinationUser,
            destinationWallet: req.body.destinationWallet,
            amount: req.body.amount,
            date: req.body.date
        });
        await moneyRequest.save();
        res.send(moneyRequest);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

//delete moneyRequest
app.delete("/moneyRequests/:id", mongoChecker, async (req, res) => {
    try {
        const moneyRequest = await MoneyRequest.findById(req.params.id);
        await moneyRequest.remove();
        res.send(moneyRequest);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});
//get all moneyRequests
app.get("/moneyRequests", mongoChecker, async (req, res) => {
    try {
        const moneyRequests = await MoneyRequest.find({});
        res.send(moneyRequests);
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");  
    }   
});

//get user incoming moneyRequests
app.get("/moneyRequests/incoming/:userName", mongoChecker, async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.params.userName.toLowerCase(),
        });
        const moneyRequests = await MoneyRequest.find({
            destinationUser: user.userName,
        });
        res.send(moneyRequests);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});
//get user outgoing moneyRequests
app.get("/moneyRequests/outgoing/:userName", mongoChecker, async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.params.userName.toLowerCase(),
        });
        const moneyRequests = await MoneyRequest.find({
            originUser: user.userName,
        });
        console.log(moneyRequests);
        res.send(moneyRequests);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

//get user transactions
app.get("/transactions/:userName", mongoChecker, async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.params.userName.toLowerCase(),
        });
        const transactions = await Transaction.find({
            $or: [
                { originUser: user.userName },
                { destinationUser: user.userName }
            ]
        });
        res.send(transactions);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

//get all transactions
app.get("/transactions", mongoChecker, async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.send(transactions);
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

//post transaction
app.post("/transaction", mongoChecker, async (req, res) => {
  try {
      const transaction = new Transaction({
          originUser: req.body.originUser,
          destinationUser: req.body.destinationUser,
          amount: req.body.amount,
          date: req.body.date,
          time: req.body.time
      });
      await transaction.save();
      res.send(transaction);
  } catch (error) {
      if (error.name === "ValidationError") {
          res.status(400).send(error.message);
      } else {
          log(error);
          res.status(500).send("Internal Server Error");
      }
  }
});

//create new Report
//request body expects
// {
// submitter: <userName>,
// reportedUser: <userName>,
// reason: <reason>,
// date: <date>,
// time: <time>
// }
app.post("/reports", mongoChecker, async (req, res) => {
    try {
        const report = new Report({
            submitter: req.body.submitter,
            reportedUser: req.body.reportedUser,
            reason: req.body.reason,
            date: req.body.date,
            time: req.body.time
        });
        await report.save();
        res.send(report);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
        } else {
            log(error);
            res.status(500).send("Internal Server Error"); 
        }
    }
});

//resolve report
//request body expects
// {
// comment: <comment>,
//}
app.patch("/reports/:id", mongoChecker, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        report.comment = req.body.comment;
        report.status = true;
        await report.save();
        res.send(report);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send("Resource not found");
        } else {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

//get all reports
app.get("/reports", mongoChecker, async (req, res) => {
    try {
        const reports = await Report.find({});
        res.send(reports);
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = ["/", "/login", "/dashboard"];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }

  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
