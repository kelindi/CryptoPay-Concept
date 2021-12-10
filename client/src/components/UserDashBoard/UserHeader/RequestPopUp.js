import React, { Component } from "react";
import Transaction from "../../../classes/Transaction";
import MoneyRequest from "../../../classes/MoneyRequest";
import cPayRequest from "../../../CryptoPayClient";
 
class RequestPopUp extends Component {
    constructor(props){
        super(props);
        this.state ={
            amount: '',
            requestReceiver: '',
            validAmount: false,
            currentUser: this.props.currentUser.userName,
            userFriends: this.props.global.friendsList,
            filteredFriends: this.props.global.friendsList,
            sentRequests: this.props.global.sentMoneyRequests,
            showResults: false,
            nameFilled: false,
        }
        this.amountValidation = this.amountValidation.bind(this)
    }

    minimizePopUp = () => {
        this.props.minimizeSend();
       };
   
    maxmizePopUp = () => {
        this.props.maximizeSend();
    };

    setRequestReceiver = (event)=> {
        this.setState({requestReceiver: event.target.value}, this.setFilteredFriends)   
    }

    setFilteredFriends = () => {
        
        if(this.state.requestReceiver === '') {
            this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
        }
        else{
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.requestReceiver.toString())))}, this.setState({showResults: true}))
        }
        
    }

    amountValidation(event){
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    pasteOption = (event) => {
        console.log(event.target.value)
        this.setState(({showResults: false}), this.setState({filteredFriends: []}, this.setState({requestReceiver: event.target.value},
            this.setState({nameFilled: true}))))
    } 

    sendRequest = async () => {
        if(this.state.validAmount && this.state.nameFilled){
            // const requesteeList = this.props.global.friendsList.filter(friend => {
            //     return friend.userName === this.state.requestReceiver
            // }) // what does this do?
            // const requestee = requesteeList[0]
            // const newReqList = this.props.global.sentMoneyRequests
            // // CHANGE this to JSON body not a request
            // const newReq = new MoneyRequest(this.state.currentUser, requestee, this.state.amount, "10-01-2021" )
            // newReqList.push(newReq)
            // this.setState({
            //     sentRequests: newReqList
            // })
            // this.props.changeSentMoneyRequests(newReqList)
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = String(today.getFullYear());

            let h = String(today.getHours())
            let m = String(today.getMinutes()).padStart(2, '0');

            let date = yyyy + '/' + mm + '/' + dd;
            console.log(date)
            let time = h + ':' + m;
            // find wallet address of reciever
            let {status, data} = await cPayRequest('/api/user/'+ this.state.currentUser +'/friends', 'get');
            let rWalletAddress = data.filter(friends => (friends.userName.toString().includes(this.state.requestReceiver.toString())))[0].walletAddress

            let body = {
                originUser: this.state.currentUser,
                destinationUser: this.state.requestReceiver,
                destinationWallet: rWalletAddress,
                amount: this.state.amount,
                date: date
            }
            console.log(JSON.stringify(body))
            cPayRequest('/moneyRequests', 'post', body);
            console.log("done")
        } 
        this.props.minimizeSend()
        // Add cases where not valid amount/username and display error on screen
    }

    handleClick = () => {
     this.props.toggle();
    };

    render() {
        const {global, changeSentMoneyRequests} = this.props
        return (
            <div className="bg-transparent w-screen h-screen shadow-lg fixed left-0 z-50">
            <div className="flex flex-col bg-black rounded md:w-1/3 w-1/2 h-auto shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-gray-800 ">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-white md:text-base text-sm">Request Money</span>
                        {/* <span className="ml-96" onClick={this.handleClick}>X</span> 
                        make the x into a button, not span */}
                    </div>
                    <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                        <div className='h-2/3'>
                            <div className='h-1/3 mt-2'>
                                Friend:
                                <input className="ml-8 w-44 pl-2" value={this.state.requestReceiver} onChange={this.setRequestReceiver} placeholder="Friend"/>
                                {this.state.showResults ? (
                                    <div className='ml-20 w-44 pl-1 opacity-100 bg-white absolute'>
                                        <ul className=''>
                                        {this.state.filteredFriends.map((friend) =>
                                        {
                                            return (
                                                <li><button onClick={this.pasteOption} value={friend.userName}>{friend.userName}</button></li>
                                            )
                                        })}
                                    </ul>
                                    </div>

                                ) : null}
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
                            onClick={this.sendRequest}>Request</button>
                            <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.minimizePopUp}><b>Cancel</b></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black opacity-80 w-full h-full"></div>
            </div>
        );
    }
}
 
export default RequestPopUp;