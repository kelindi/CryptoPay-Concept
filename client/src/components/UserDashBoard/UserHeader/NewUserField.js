import React, { Component } from "react";
import { uuid } from "uuidv4";
 
class NewUserField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendFields: this.props.friendFields,
            showResults: false,
            filteredFriends:this.props.global.friendList,
            key: uuid(),
        }
    }

    setMoneyReceiver = (key, event)=> {
        console.log("yo")
        this.setState({requestReciever: event.target.value}, this.setFilteredFriends)
    }

    setFilteredFriends = () => {
        
        if(this.state.requestReceiver === '') {
            this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
        }
        else{
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.requestReceiver.toString())))}, this.setState({showResults: true}))
        }
        
    }

    render(){
        console.log("New field rendering")
        return (
            <div id="friend" className='h-1/3 mb-2 flex flex-row'>
                <div>
                    Friend:
                    <input className="ml-8 w-44 pl-2" value={this.state.moneyReceiver[this.state.key]}
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
                                        <li><button onClick={(e)=>this.pasteOption(this.state.key,e)} value={friend.userName}>{friend.userName}</button></li>
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