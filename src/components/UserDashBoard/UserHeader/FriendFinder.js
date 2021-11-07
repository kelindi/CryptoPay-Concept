import React, { Component } from "react";

class FriendFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // nameToSearch: this.props.nameToSearch,
            // userFriends: this.props.userFriends,
            // masterUserFriends: this.props.userFriends,
            displayHTML: this.props.displayHTML
        }
    }


    render() {
        console.log(this.state.displayHTML)
        return(
            <div className='ml-16 bg-white'>
                <div className='bg-white-500'>
                    <ul className='absolute'>{this.state.displayHTML}</ul>
                </div>
            </div>
        );
    }
}

export default FriendFinder;