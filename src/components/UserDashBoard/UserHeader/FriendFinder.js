import React, { Component } from "react";

class FriendFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameToSearch: this.props.nameToSearch,
            userFriends: this.props.userFriends,
        }
    }

    render() {
        //filtering
        let display = []
        let results = this.state.userFriends.filter(friends => (friends.firstName.includes(this.state.nameToSearch)))
        //displaying
        for(let i=0; i<results.length; i++) {
            let user = results[i]
            // should i use userids to filter or name
            console.log(user.firstName.toString())
            let name = user.firstName + " " + user.lastName //style this to fit name in one line or else cut the name
            display.push(<li><div className='bg-white-500'>{name}</div></li>)
        }
        return(
            <div className='ml-16 bg-white'>
                <div className='bg-white-500'>
                    <ul className='absolute'>{display}</ul>
                </div>
            </div>
        );
    }
}

export default FriendFinder;