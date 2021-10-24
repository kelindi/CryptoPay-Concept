import React, { Component } from 'react';


class UserDashBoard extends Component {
    constructor(props) {
        super(props);
        
    }
    
    

    render() {
        console.log(this.props)
        return (
            <div key = {this.props.backend} className="font-sans">
                
            </div>
          );
    }
}
 
export default UserDashBoard;