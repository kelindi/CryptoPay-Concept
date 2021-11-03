import React, { Component } from 'react';
import FriendsList from './FriendsList';
import UserFeed from './UserFeed';
import UserHeader from './UserHeader';


class UserDashBoard extends Component {
    constructor(props) {
        super(props);
    }
    
    

    render() {
        const {currentUser} = this.props
        return (
            <div className="font-sans">
                <div className = "flex flex-column h-100">
                    <div className = "w-10/12 h-screen">
                        <UserHeader backend ={this.props.backend} currentUser ={this.props.currentUser}></UserHeader>

                        <UserFeed backend ={this.props.backend} currentUser ={this.props.currentUser}></UserFeed>
                    </div>
                    
                    <FriendsList backend ={this.props.backend} currentUser ={this.props.currentUser}></FriendsList>
                </div>
                
            </div>
          );
    }
}
 
export default UserDashBoard;