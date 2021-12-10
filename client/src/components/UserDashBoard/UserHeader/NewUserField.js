import React, { Component } from "react";
 
class NewUserField extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            showResults: false,
            filteredFriends:this.props.global.friendsList,
            key: this.props.uid,
            moneyReceiver: this.props.moneyReceiver,
            userFriends: this.props.global.friendsList,
        }
    }

    setMoneyReceiver = (key, event)=> {
        console.log(event.target.value)
        let moneyReceiver = this.state.moneyReceiver
        moneyReceiver[key] = event.target.value
        this.setState({moneyReciever: moneyReceiver}, this.setFilteredFriends(key))
    }

    setFilteredFriends = (key) => {
        // console.log("yo")
        if(this.state.moneyReceiver[key] === '') {
            this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
        }
        else{
            // console.log(this.state.moneyReceiver[key])
            // console.log(this.state.userFriends[0].userName.toString().includes(this.state.moneyReceiver[key].toString()))
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver[key].toString())))}, this.setState({showResults: true}))
        }
        // friends.userName.toString().includes(this.state.requestReceiver.toString())
    }

    render(){
        console.log("New field rendering")
        const {global, key, friendFields, moneyReceiver, pasteOption, percentValidation} = this.props;
        // console.log(this.props)
        // console.log(this.props.global.friendsList)
        console.log(this.state.key)
        return (
            <div id="friend" className='h-1/3 mb-2 flex flex-row'>
                <div>
                    Friend:
                    <input className="ml-8 w-44 pl-2"
                            onChange={(e) => this.setMoneyReceiver(this.state.key, e)} placeholder="Friend"/>
                        {/* {Object.keys(this.state.friendFieldLen).length>=0? (
                            <button className='mx-3 px-0.5 w-4 h-4' value={key} onClick={this.deleteFriendField}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                                </svg>
                            </button>
                        ): null} */}
                    {this.state.showResults? (
                    <div id="friendDropdown" className='ml-20 w-44 pl-2 opacity-100 bg-white absolute'>
                        <ul className=''>
                            {this.state.filteredFriends.map((friend) =>
                            {
                                if(!Object.values(this.props.moneyReceiver).includes(friend.userName)){
                                    // console.log(this.state.moneyReceiver)
                                    return (
                                        <li><button onClick={(e)=>this.props.pasteOption(this.state.key,e)} value={friend.userName}>{friend.userName}</button></li>
                                    )
                                }
                            })}
                        </ul>

                    </div>
                    ):null}
                </div>
                <div className = 'mx-4'>
                    Percent:
                    <input className = 'w-16 ml-2 pl-2'  placeholder='0.0'
                    onChange={(e) => this.props.percentValidation(this.state.key, e)}>
                    </input>
                </div>
            </div> 
        ) 
    }
}

export default NewUserField;

// value={this.state.percentages[this.state.key]}