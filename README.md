# README    


## URL:  https://crypt0pay.herokuapp.com/


# User Functionalities
## Account and Login
Our platform has a login and a registration page to allow users to have a personal account, using which they can send friend requests to other accounts,
receive friend requests from other accounts, and manage their wallets, and other profile information.

Any User can login to their CryptoPay account by filling in their login credentials. These credentials are then authorized by our code before allowing 
users access to their dashboard. If they are an admin, they are redirected to the Admin Dashboard otherwise they are redirected to the User Dashboard.

If the user does not have an existing account, they can create a new account by clicking the "Create One!" option in the login page. This redirects the 
user to the registration page where they can fill in the details to register themselves. One feature that we have implemeted is that we require the user to
have a strong password with specific type of characters a must. In case they don't have that in their password, the page lets them know exactly what they 
are missing in the password.

NOTE: If the user does not have the chrome extension "Metamask" installed, they will be redirected to a page with a link requesting them to install "Metamask". They 
will also need to register themselves and login to "Metamask" before logging in to CryptoPay.

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

The button generates outgoing requests and displays them on the "User Feed" section (explained later) upojn page refresh.

#### The Split Button
The "Split" option allows the user to split the money between mulitple users based on percentage. The User can use the "+" button to add more friends.
Thhe user also has an option to choose if they want to "Request" for money or "Send" money to the users entered. 

The button generates outgoing requests and displays them on the "User Feed" section upon page refresh.


### The User Feed
The User Feed displays three sections of information for the convenience of the user:

#### Outgoing Friend Requests: 
The User can see the outgoing friend requests they made along with the option to rescind it. Each outgoing request comes with the option to cancel the friend request
which rescinds the friend request.

#### Outgoing and Incoming Money Requests:
The User can see the outgoing money requests they made with the option to rescind it.
The Users cans also see any incoming money requests they have with the options to either accept it or reject it. Accepting it will deduct the balance from their account balance.

Recinding/Rejecting requests removes them from the dashboard.

#### Transactions
The User can see a history of their outgoing transactions in this section of the website. 

The Users can filter the listed transactions by one or more than one criteria by typing in the search value in the search bars under each column.
Doing so, they will be able to see the filtered transactions. They can search by Destination (username), Amount, Date, TIme and ID (wallet-address). 

#### Notifications
The notification icon at the top of the screen, when clicked, displays all the incoming friend requests that the user has. The user can accept or reject the friend requests.

#### LogOut 
The Log out button next to the notifications button allows the user to end their current session and log out of their account.

# Admin Functionality
## Admin Dashboard

### Reports
This section lists all the reports made by a user against another user, and the reason for the report. 
An admin can view reports users have made and resolve them internally, and then mark the reports as resolved along with a comment.

This tab also lists all the reports that have already been resolved, when they were resolved and the comment made while resolving it.

### Users
This page displays all the users that have registered with CryptoPay with their first and last names, their username, and wallet address.
The admin functionality to this section comprises of editing any users first name, last name, or their username.
The admin can also filter the users using one or more parameters including first name, last name,  username and wallet address.

### Money Requests
This page lists all the pending money requests that have been made from the requestor user to the destination user. It lists the amount, date and a transaction ID.
The admin can delete any pending money requests by clicking the "delete" button.

### Transactions
This page lists all the successfull transactions made by origin user to destination user with the amount and transaction id.
The admin can also filter the s using one or more parameters including origin (username), destination (username), amount, date, time, and transaction id.



