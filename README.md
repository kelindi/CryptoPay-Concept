# README    
In this project, we have created a platform for users to send, request, and split money that they maybe owing or are owed.
The uniqueness of this platform lies in the fact that the medium of monetary exchange is StableCoin, a one-to-one valuation with US Dollars.

Third Party Linraries Used: Tailwind, React

# User Functionalities
## Account and Login
Our platform has a login and a registration page to allow users to have a personal account, using which they can send friend requests to other accounts,
receive friend requests from other accounts, and manage their wallets, and other profile information.

NOTE:
User Login Credentials: username = "user", password = "user"
Admin Login Credentials: username = "admin", password = "admin"

## The User Dashboard
Each user has a dedicated dashboard with the following sections:
### The User Header:
The User Header has the profile photo of the user, their information and three key functionalility buttons:
- The "Send" Button
- The "Request" Button
- The "Split" Button

#### The Send Button
The "Send" button allows the user to enter the username of the person they are sending money to along with the amount.
It has to be noted that that the user can only send money to their friends. If they wish to send money to others, they need to befriend them first on the application.

The button also deducts (and reflects on the dashboard) the amount sent to the friend from the user's account balance.

#### The Request Button
The "Request" button allows the user to enter the username of the person they are requesting money from along with the amount.
It has to be noted that the user can only request money from their friends. If they wish to request from others, they need to befriend them on the application first.

The button generates outgoing requests and displays them on the "User Feed" section (explained later).

#### The Split Button
The "Split" option allows the user to split the money between mulitple users based on percentage they owe the user before sending the money requests to the participating friends.
The user has an option to add multiple friends to divide the money amongst.

### The User Feed
The User Feed displays three sections of information for the convenience of the user:

#### Outgoing Friend Requests: 
The User can see the outgoing friend requests they made along with the option to rescind it. 

#### Outgoing and Incoming Money Requests:
The User can see the outgoing money requests they made with the option to rescind it.
The Users cans also see any incoming money requests they have with the options to either accept it or reject it. Accepting it will deduct the balance from their account balance.

Recinding/Rejecting requests removes them from the dashboard.

# Admin Functionality
On the Admin Page an admin can view reports users have made and resolve them internally, and then mark the reports as resolved along with a comment.

On the users page the admin can edit a user’s name first name and last name

On the money requests page admin can delete pending money requests

On the transactions page admin can view all transactions on the site and view them through filters
