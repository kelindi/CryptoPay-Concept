import React, { Component } from "react";
 
class SplitPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: '',
            validAmount: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.currentUser.friends,
            filteredFriends: this.props.userFriends,
            showResults: false,
            nameFilled: false,
            addFriend: false,
        }
    }

    minimizePopUp = () => {
        this.props.minimizeSplit();
    };
   
    maxmizePopUp = () => {
        this.props.maximizeSplit();
    };

    pasteOption = (event) => {
        console.log(event.target.value)
        this.setState(({showResults: false}), this.setState({filteredFriends: []}, this.setState({moneyReceiver: event.target.value},
            this.setState({nameFilled: true}))))
    } 

    amountValidation(event){
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    newFriendField = () => {
        this.setState({addFriend: true})
    }

    render() {
        return (
            <div className="bg-white rounded md:w-1/3 w-1/2 h-1/1 border shadow-lg absolute z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Split Money</span> 
                    </div>
                </div>
                <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                    <div className='h-2/3'>
                        {/* Searching friends */}
                        {/* Add the div below to another function which re-renders the friends based on plus button usage */}
                        <div className='h-1/3 mt-2'>
                            Friend:
                            <input className="ml-5 pl-2" value={this.state.moneyReceiver}
                                   onChange={this.setMoneyReceiver} placeholder="Friend"/>
                            <button className='mx-3 px-0.5 w-4 h-4' 
                                    onClick={this.newFriendField}>➕</button>
                            {this.state.showResults ? (
                            <div>
                                <ul className=''>
                                    {this.state.filteredFriends.map((friend) =>
                                    {
                                        return (
                                            <li>{friend.userName}</li>
                                        )
                                    })}
                                </ul>

                            </div>
                            ):null}
                            {/* {this.state.searchOn ? <FriendFinder displayHTML={this.state.displayHTML}/>:null} */}
                        </div>
    
                        <div className='h-1/3'>
                            <form>
                                <label>
                                    Amount:
                                    <input className="ml-2 pl-2" type="text"  value={this.state.amount} onChange={this.amountValidation} placeholder="Amount"/>
                                </label>                
                            </form>
                        </div>
                    </div>
                    <div className='w-1/1 mt-2 text-right'>
                        <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.sendMoney}><b>Send</b></button>
                        <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.minimizePopUp}><b>Cancel</b></button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SplitPopUp;