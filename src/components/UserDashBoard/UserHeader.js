import React, { Component } from 'react';


class UserHeader extends Component {
    constructor(props) {
        super(props);
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
                {console.log(this.props.currentUser)}
            </div>
          );
    }
}
 
export default UserHeader;