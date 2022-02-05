
# CryptoPay
![App Screenshot](https://i.imgur.com/Z8XnpR6.png)


CryptoPay is a proof of concept  of a "venmo" like platform powered by web3. Users can currently make friends, send and receive money requests, and complete transactions with a metamask wallet.

## User Functionality

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


## Stack

**Client**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)
**Server**
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## Getting started

Install metamask and connect it to a test network (ie. Ropsten, Goerli)

Install Dependencies
```bash
npm run start
```
Start the project 
```bash
npm run dev
```
## [Demo](https://crypt0pay.herokuapp.com/)
Note: Application runs better on localhost (data loads quicker)











