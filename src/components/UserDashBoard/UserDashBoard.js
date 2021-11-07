import React, { Component } from 'react';
import FriendsList from './FriendsList';
import NotificationBar from './NotificationBar/NotificationBar';
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

    //comment
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
                        <NotificationBar global = {this.state} incomingFriendRequests = {this.state.incomingFriendRequests}></NotificationBar>
                        <UserHeader changeUserBalance = {this.changeUserBalance} global ={this.state} backend ={this.props.backend} currentUser ={this.props.currentUser}></UserHeader>

                        <UserFeed changeIncomingMoneyRequests = {this.changeIncomingMoneyRequests} changeUserBalance = {this.changeUserBalance} changeFriendsList = {this.changeFriendsList} changeIncomingFriendRequests = {this.changeIncomingFriendRequests} backend ={this.props.backend} currentUser ={this.props.currentUser}></UserFeed>
                    </div>
                    
                    <FriendsList backend ={this.props.backend} currentUser ={this.props.currentUser}></FriendsList>
                </div>
                
            </div>
          );
    }
}
 
export default UserDashBoard;