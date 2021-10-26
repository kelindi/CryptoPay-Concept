import React, { Component } from 'react';


class UserDashBoard extends Component {
    constructor(props) {
        super(props);
    }
    
    

    render() {
        const {currentUser} = this.props
        console.log(currentUser)
        return (
            <div className="font-sans">
                
            </div>
          );
    }
}
 
export default UserDashBoard;