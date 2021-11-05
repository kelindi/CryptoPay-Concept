import React, { Component } from 'react';


class UserHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    state = { 
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        // pF: this.props.currentUser.profilePicture,
        pF: window.location.origin + "/profilePictures/pf2.jpg",
        // pf: process.env.PUBLIC_URL,
        balance: this.props.currentUser.currentAccountBalance
    }

    render() {
        
        return (
            <div className = "h-1/5 bg-purple-300">
                {/* 1) placeholder profile photo which can be modified by user
                    2) Display Name
                    3) Display Account Balance 
                    4) 3 buttons:
                        - Send
                        - Request
                        - Split*/}
                {/* <img className='UserProfilePhoto' src={this.state.pF} alt="Profile Photo"/> */}
                <img className='UserProfilePhoto' src={window.location.origin + "/src/images/profilePictures/pf2.jpg"} alt="Profile Photo"/>
                <p>{this.state.firstName}</p>
                {console.log(this.props)}
            </div>
          );
    }
}
 
export default UserHeader;