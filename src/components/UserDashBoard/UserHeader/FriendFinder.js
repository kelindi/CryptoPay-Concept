import React, { Component } from "react";

class FriendFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameToSearch: this.props.nameToSearch,
            userFriends: this.props.userFriends,
            display: []
        }
    }

    render() {
        //filtering
        let results = this.state.userFriends.filter(friends => (friends.firstName.includes(this.state.nameToSearch)))
        // console.log(results)
        //displaying
        for(let i=0; i<this.state.userFriends.length; i++) {
            let user = this.state.userFriends[i]
            // should i use userids to filter or name
            console.log(user.firstName.toString())
            let name = user.firstName + " " + user.lastName //style this to fit name in one line or else cut the name
            this.state.display.push(<li><div className='bg-white-500'>{name}</div></li>)
        }
        return(
            <div className='ml-16 bg-white'>
                <div className='bg-white-500'>
                    <ul className='absolute'>{this.state.display}</ul>
                </div>
            </div>
        );
    }
}

export default FriendFinder;