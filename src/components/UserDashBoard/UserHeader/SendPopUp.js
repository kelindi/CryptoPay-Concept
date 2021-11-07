import React, { Component } from "react";
import FriendFinder from './FriendFinder';
 
class SendPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: '',
            validAmount: true,
            searchOn: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.currentUser.friends
        }
        this.amountValidation = this.amountValidation.bind(this)
        this.sendMoney = this.sendMoney.bind(this)
        this.setMoneyReceiver = this.setMoneyReceiver.bind(this)
    }

    minimizePopUp = () => {
     this.props.minimizeSend();
    };

    maxmizePopUp = () => {
        this.props.maximizeSend();
    };

    amountValidation(event){
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount})
        }
        else {
            this.setState({validAmount: false})
        }
    }

    sendMoney(){
        this.props.updateBalance(this.state.amount)
        this.props.minimizeSend()
    }

    setMoneyReceiver(event) {
        const searchVal = event.target.value
        this.setState({moneyReceiver: searchVal})   
        this.setState({searchOn: true})    
    }

    render() {
        return (
            <div className="bg-white rounded md:w-1/3 w-1/2 h-1/1 border shadow-lg absolute z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Send Money</span> 
                    </div>
                </div>
                <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                    <div className='h-2/3'>
                        {/* Searching friends */}
                        <div className='h-1/3 mt-2'>
                            Friend:
                            <input className="ml-5 pl-2" type="text"  value={this.state.moneyReceiver} onChange={this.setMoneyReceiver} placeholder="Friend"/>
                            {this.state.searchOn ? <FriendFinder nameToSearch={this.state.moneyReceiver}
                                                                 userFriends={this.state.userFriends}/>:null}
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
 
export default SendPopUp;