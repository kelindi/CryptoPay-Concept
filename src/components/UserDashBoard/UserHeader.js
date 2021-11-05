import React, { Component } from 'react';


class UserHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    state = { 
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        pf: this.props.currentUser.profilePicture,
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
                <img className='rounded-full h-40 w-40 flex px-4 py-4 items-center justify-center' src={this.state.pf} alt="Profile Photo"/>
                {/* <p>{this.state.firstName}</p> */}
            </div>
          );
    }
}
 
export default UserHeader;