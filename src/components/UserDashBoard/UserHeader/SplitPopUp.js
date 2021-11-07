import React, { Component } from "react";
 
class SplitPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: [],
            validAmount: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.currentUser.friends,
            filteredFriends: this.props.userFriends,
            showResults: [],
            nameFilled: false,
            friendFields: [],
            friendFieldLen: 1,
            addFriend: true,
        }
    }

    minimizePopUp = () => {
        this.props.minimizeSplit();
    };
   
    maxmizePopUp = () => {
        this.props.maximizeSplit();
    };

    pasteOption = (i, event) => {
        console.log(event.target.value)
        this.setState((this.setState({filteredFriends: []}, this.setState({nameFilled: true}, this.setMoneyReceiver(i, event)))),  this.setShowResult(i, false))
    } 

    splitMoney = () => {
        if(this.state.validAmount && this.state.nameFilled){
            this.props.updateBalance(this.state.amount) //CHANGE THIS LATER TO SPLIT AMOUNT
            this.props.minimizeSplit()
        }  
    }

    amountValidation = (event) => {
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    setMoneyReceiver = (i, event)=> {
        // if(event.target.value === ''){
        //     this.setState({moneyReceiver:event.target.value},this.setState({filteredFriends:[]}))
        //     return
        // }
        let receiverList = this.state.moneyReceiver
        receiverList[i] = event.target.value
        this.setState({moneyReceiver: receiverList}, this.setFilteredFriends(i))   
        console.log(event.target.value)
        console.log(receiverList)
    }

    setShowResult = (i, val)=> {
        let results = this.state.showResults
        results[i] = val
        this.setState({showResults: results})
    }

    setFilteredFriends = (i) => {
        console.log('filtering: ', i)
        if(this.state.moneyReceiver[i] === '') {
            this.setState(this.setState({filteredFriends: []}, this.setShowResult(i, false)))
            
        }
        else{
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver[i].toString())))},  this.setShowResult(i, true))
        }
        
    }

    newFriendField = () => {
        this.setState({friendFieldLen: this.state.friendFieldLen + 1})
    }

    displayFriendFields = () => {
        console.log(this.state.friendFieldLen)
        console.log(this.state.addFriend)
        for(let i=0; i<this.state.friendFieldLen; i++) {
            this.state.friendFields[i] = (
                // might have to add key for uniqueness, friend deletion
                <li>
                    <div className='h-1/3 mb-2'>
                        Friend:
                        <input className="ml-8 w-44 pl-2" value={this.state.moneyReceiver[i]}
                                onChange={(e) => this.setMoneyReceiver(i, e)} placeholder="Friend"/>
                                <button className='mx-3 px-0.5 w-4 h-4' 
                                    onClick={this.newFriendField}></button>
                        {this.state.showResults[i] ? (
                        <div className='ml-20 w-44 opacity-100 bg-white absolute'>
                            <ul className=''>
                                {this.state.filteredFriends.map((friend) =>
                                {
                                    return (
                                        <li><button onClick={(e)=>this.pasteOption(i,e)} value={friend.userName}>{friend.userName}</button></li>
                                    )
                                })}
                            </ul>

                        </div>
                        ):null}
                        {/* {this.state.searchOn ? <FriendFinder displayHTML={this.state.displayHTML}/>:null} */}
                    </div>         
                </li>
            )
        }
    }

    render() {
        return (
            <div className="flex flex-col bg-white rounded md:w-1/3 w-1/2 h-auto border shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Split Money</span> 
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 md:text-base text-sm border-b p-2 h-auto">
                    <div className='flex flex-col h-2/3'>
                        {/* Searching friends */}
                        <div className='my-2 flex flex-col' on>
                            {this.displayFriendFields()}
                            <div>
                                <ul>
                                    {this.state.friendFields}
                                </ul>
                            </div>
                        </div> 
                        <div>
                        <button className='mx-3 px-0.5 w-4 h-4' onClick={this.newFriendField}>➕</button>
                        </div>
                        <div className='h-1/3'>
                            <form>
                                <label>
                                    Amount:
                                    <input className="ml-5 w-44 pl-2" type="text"  value={this.state.amount} onChange={this.amountValidation} placeholder="Amount"/>
                                </label>                
                            </form>
                        </div>
                    </div>
                    <div className='w-1/1 mt-2 text-right'>
                        <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.splitMoney}><b>Send</b></button>
                        <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.minimizePopUp}><b>Cancel</b></button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SplitPopUp;

