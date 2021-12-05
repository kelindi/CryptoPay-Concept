import React, { Component } from "react";
import { uuid } from "uuidv4";
 
class SplitPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: {},
            percentages: {},
            validAmount: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.friendsList,
            filteredFriends: this.props.friendsList,
            showResults: {},
            // nameFilled: false,
            nameFilled: true,
            friendFields: {},
            friendFieldLen: 0,
            addFriend: true,
            // key: 0
        }
    }

    minimizePopUp = () => {
        this.props.minimizeSplit();
    };
   
    maxmizePopUp = () => {
        this.props.maximizeSplit();
    };

    pasteOption = (key, event, friend) => {
        // console.log(event.target.value)
        // this.setState((this.setState({filteredFriends: []}, this.setState({nameFilled: true}, this.setMoneyReceiver(key, event)))),  this.setShowResult(key, false))
        // Update money reciever
        let receiverList = this.state.moneyReceiver
        receiverList[key] = event.target.value

        // Manipulate DOM
        let dropdownDiv = document.querySelector('#friendDropdown')
        dropdownDiv.parentElement.childNodes[1].value = event.target.value
        dropdownDiv.parentElement.removeChild(dropdownDiv.parentElement.childNodes[dropdownDiv.parentElement.childNodes.length - 1])

        // Update filtered friends
        // let fFriends = this.state.filteredFriends
        // fFriends.splice(fFriends.indexOf(friend), 1)
        this.setState({moneyReceiver: receiverList})
        // this.setState({filteredFriends: fFriends})
    } 

    splitMoney = () => {
        let validPercent = false
        let percentages =  Object.values(this.state.percentages)
        let sum = percentages.reduce((a, b) => a + b, 0)
        if(sum <= 100 && Object.values(this.state.percentages).length == this.state.friendFieldLen) {     
            validPercent = true
        }
        if(this.state.validAmount && this.state.nameFilled && validPercent){
            this.props.updateBalance(this.state.amount*(100-sum)/100) //CHANGE THIS LATER TO SPLIT AMOUNT
            // request money from users
            for(let i=0; i<percentages.length; i++) {
                // amounts[i]*percentages[i]/100
                console.log(this.state.amount*percentages[i]/100)
            }

            this.props.minimizeSplit()
        }  
    }

    amountValidation = (event) => {
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    percentValidation = (key, event) => {
        const percent = event.target.value
        let percentVal = +percent
        // console.log(percentVal)
        if(!isNaN(percentVal)) {
            this.state.percentages[key] = percentVal
            this.setState({percentages: this.state.percentages})
        }
    }

    setMoneyReceiver = (key, event)=> {
        // if(event.target.value === ''){
        //     this.setState({moneyReceiver:event.target.value},this.setState({filteredFriends:[]}))
        //     return
        // }    
        let receiverList = this.state.moneyReceiver
        receiverList[key] = event.target.value
        this.setState({moneyReceiver: receiverList}, this.setFilteredFriends(key))   
        // console.log(event.target.value)
        // console.log(receiverList)
    }

    setShowResult = (key, val)=> {
        let results = this.state.showResults
        results[key] = val
        this.setState({showResults: results})
    }

    setFilteredFriends = (key) => {
        // console.log('filtering: ', i)
        if(this.state.moneyReceiver[key] === '') {
            this.setState(this.setState({filteredFriends: []}, this.setShowResult(key, false)))
            
        }
        else{
            // console.log(this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver[key].toString()))))
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver[key].toString())))},  this.setShowResult(key, true))
        }
        
    }

    newFriendField = () => {
        const key = uuid()
        const fields = this.state.friendFields
        const result = this.state.showResults
        result[key] = false
        //check if key already present
        if(this.state.filteredFriends.length > 0) {
            fields[key] = (
                <li key={key}>
                    <div className='h-1/3 mb-2 flex flex-row'>
                        <div>
                            Friend:
                            <input className="ml-8 w-44 pl-2" value={this.state.moneyReceiver[key]}
                                    onChange={(e) => this.setMoneyReceiver(key, e)} placeholder="Friend"/>
                                {this.state.friendFieldLen>=0? (
                                    <button className='mx-3 px-0.5 w-4 h-4' value={key} onClick={this.deleteFriendField}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                                        </svg>
                                    </button>
                                ): null}
                            {true? (
                            <div id="friendDropdown" className='ml-12 w-44 opacity-100 bg-white absolute'>
                                <ul className=''>
                                    {this.state.filteredFriends.map((friend) =>
                                    {
                                        return (
                                            <li><button onClick={(e)=>this.pasteOption(key,e, friend)} value={friend.userName}>{friend.userName}</button></li>
                                        )
                                    })}
                                </ul>

                            </div>
                            ):null}
                        </div>
                        <div className = 'mx-4'>
                            Percent:
                            <input className = 'w-16 ml-2 pl-2' value={this.state.percentages[key]} placeholder='0.0'
                            onChange={(e) => this.percentValidation(key, e)}>
                            </input>
                        </div>
                    </div>         
                </li>
            )
            this.setState({friendFields: fields}, this.setState({friendFieldLen: this.state.friendFieldLen + 1}, this.setState({showResults: result})))
        }
    }

    // deleteFriendField = () => {
    //     alert("TO DO!")
    // }

    // delete = (obj, key) => {
    //     if(obj.hasKey(key)) {
    //        delete obj.container[key];
    //        return true;
    //     }
    //     return false;
    //  }

    deleteFriendField = (event) => {
        let i= event.target.parentElement.parentElement.value
        console.log("value: ", i)
        // delete this.state.friendFields.i
        let fields = this.state.friendFields
        console.log(fields)
        delete fields[i]
        console.log(fields)

        this.setState({friendFields: fields})  
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
                            {/* {this.newFriendField()} */}
                            <div>
                                <ul>
                                    {Object.values(this.state.friendFields)}
                                </ul>
                            </div>
                        </div> 
                        <div>
                        <button className='mx-3 px-0.5 w-4 h-4' onClick={this.newFriendField}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                            </svg>
                        </button>
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
                        {/* This will trigger multiple backend calls which will reflect changes in transaction history, and user dashboard */}
                        <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.minimizePopUp}><b>Cancel</b></button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SplitPopUp;

