import React, { Component } from 'react';
import FriendsList from './FriendsList';
import UserFeed from './UserFeed/UserFeed';
import UserHeader from './UserHeader/UserHeader';


class UserDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userBalance: this.props.currentUser.currentAccountBalance,
            userName: this.props.currentUser.userName,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            profilePicture: this.props.currentUser.profilePicture,
            friendsList: this.props.currentUser.friends,
            incomingFriendRequests: this.props.currentUser.friendRequests,
            sentFriendRequests:this.props.currentUser.sentFriendRequests,
            incomingMoneyRequests: this.props.currentUser.requests,
            sentMoneyRequests: this.props.currentUser.sentRequests
        };
    }


    changeUserBalance = (x) => {
        this.setState({userBalance:x})
    }

    changeUserName = (x) => {
        this.setState({userName:x})
    }

    changeFirstName = (x) => {
        this.setState({FirstName:x})
    }

    changeLastName = (x) => {
        this.setState({LastName:x})
    }

    changeProfilePicture = (x) => {
        this.setState({profilePicture:x})
    }

    changeFriendsList = (x) => {
        this.setState({friendsList:x})
    }

    changeIncomingFriendRequests = (x) => {
        this.setState({incomingFriendRequests:x})
    }

    changeSentFriendRequests = (x) => {
        this.setState({sentFriendRequests:x})
    }

    changeIncomingMoneyRequests = (x) => {
        this.setState({incomingMoneyRequests:x})
    }

    changeSentMoneyRequests = (x) => {
        this.setState({sentMoneyRequests:x})
    }

    render() {
        const {currentUser} = this.props
        return (
            <div className="font-sans">
                <div className = "flex flex-column h-100">
                    
                    <div className = "w-10/12 h-screen">
                        <div className = "bg-gray-600 py-4">
                            <a  className="relative inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                                <span className="flex absolute -top-2.5 -right-2 h-4 w-4 bg-red-500 rounded-full items-center justify-center animate-pulse duration-700 text-xs">{this.state.incomingFriendRequests.length}</span>
                            </a>
                        </div>
                        <UserHeader backend ={this.props.backend} currentUser ={this.props.currentUser}></UserHeader>

                        <UserFeed changeUserBalance = {this.changeUserBalance} changeFriendsList = {this.changeFriendsList} changeIncomingFriendRequests = {this.changeIncomingFriendRequests} backend ={this.props.backend} currentUser ={this.props.currentUser}></UserFeed>
                    </div>
                    
                    <FriendsList backend ={this.props.backend} currentUser ={this.props.currentUser}></FriendsList>
                </div>
                
            </div>
          );
    }
}
 
export default UserDashBoard;