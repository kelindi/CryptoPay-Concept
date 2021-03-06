import React, { Component } from "react";
import { uuid } from "uuidv4";
import NewUserField from './NewUserField';
import cPayRequest from "../../../CryptoPayClient";
 
class SplitPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: {},
            percentages: {},
            validAmount: false,
            currentUser: this.props.currentUser.userName,
            userFriends: this.props.friendsList,
            filteredFriends: this.props.friendsList,
            showResults: false,
            // nameFilled: false,
            nameFilled: false,
            friendFields: {},
            friendFieldLen: 0,
            addFriend: true,
            key: 0,
            newFriends: {},
            numFriends: -1,
            keys: [],
        }
    }

    minimizePopUp = () => {
        this.props.minimizeSplit();
    };
   
    maxmizePopUp = () => {
        this.props.maximizeSplit();
    };

    pasteOption = (key, event) => {
        console.log(key)
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
        this.setState({
            moneyReceiver: receiverList
            },this.setState({
                nameFilled: true
            })
        )
        // this.setState({filteredFriends: fFriends})
    } 

    requestMoney = async () => {
        let validPercent = false
        let percentages =  Object.values(this.state.percentages)
        let sum = percentages.reduce((a, b) => a + b, 0)
        console.log(percentages)
        if(sum <= 100 && Object.values(this.state.percentages).length == Object.values(this.state.friendFields).length) {     
            validPercent = true
        }
        // console.log(this.state.validAmount)
        // console.log(validPercent)
        if(this.state.validAmount && this.state.nameFilled && validPercent){
            // get user friends
            let {status, data} = await cPayRequest('/api/user/'+ this.state.currentUser +'/friends', 'get');
            
            for(let i=0; i<percentages.length; i++) {
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
                let rWalletAddress = data.filter(friends => (friends.userName.toString().includes(Object.values(this.state.moneyReceiver)[i].toString())))[0].walletAddress

                let body = {
                    originUser: this.state.currentUser,
                    destinationUser: Object.values(this.state.moneyReceiver)[i],
                    destinationWallet: rWalletAddress,
                    amount: this.state.amount*percentages[i]/100,
                    date: date
                }
                console.log(JSON.stringify(body))
                cPayRequest('/moneyRequests', 'post', body);
                console.log("done")
            }
        }
        else {
            alert("Invalid entries")
        }
        this.minimizePopUp() 
    }

    sendMoney = async () => {
        // copy this function for request as well
        let validPercent = false
        let percentages =  Object.values(this.state.percentages)
        let sum = percentages.reduce((a, b) => a + b, 0)
        console.log(percentages)
        if(sum <= 100 && Object.values(this.state.percentages).length == Object.values(this.state.friendFields).length) {     
            validPercent = true
        }
        // console.log(this.state.validAmount)
        // console.log(validPercent)
        if(this.state.validAmount && this.state.nameFilled && validPercent){
            // this.props.updateBalance(this.state.amount*(100-sum)/100) //CHANGE THIS LATER TO SPLIT AMOUNT
            if (this.props.global.userBalance - this.state.amount >= 0) {
                // update the balance  (NEEDS TO BE CONNECTED TO METAMASK in USERHEADER?USERDASHBOARD)
                this.props.updateBalance(this.state.amount)
                // find user friends
                let {status, data} = await cPayRequest('/api/user/'+ this.state.currentUser +'/friends', 'get');

                // generate send requests for all parties
                for(let i=0; i<percentages.length; i++) {
                    // amounts[i]*percentages[i]/100
                    console.log(this.state.amount*percentages[i]/100)

                    let today = new Date();
                    let dd = String(today.getDate()).padStart(2, '0');
                    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = today.getFullYear();

                    let h = String(today.getHours())
                    let m = String(today.getMinutes()).padStart(2, '0');
                    // reciever's waller address
                    let rWalletAddress = data.filter(friends => (friends.userName.toString().includes(Object.values(this.state.moneyReceiver)[i].toString())))[0].walletAddress
                    this.props.sendMoney(rWalletAddress, this.state.amount)
                    // where does ayush need this wallet address? updateBalance?
                    let date = yyyy + '-' + mm + '-' + dd;
                    let time = h + ':' + m;
                    let body = {
                        originUser: this.state.currentUser,
                        destinationUser: Object.values(this.state.moneyReceiver)[i],
                        amount: this.state.amount*percentages[i]/100,
                        date: date,
                        time: time
                    }
                    console.log(JSON.stringify(body))
                    // Add it to database
                    cPayRequest('/transaction', 'post', body)
                }

                

                // if(status==)
                // backend call to update transactions
            } else {
                alert("Not enough balance!")
            }
            // request money from users
            // for(let i=0; i<percentages.length; i++) {
            //     // amounts[i]*percentages[i]/100
            //     console.log(this.state.amount*percentages[i]/100)
            // }
        } 
        else {
            alert("Invalid entries")
        }
        this.minimizePopUp() 
    }

    amountValidation = (event) => {
        const amount = event.target.value
        if(!isNaN(+amount)) {
            // if(amount > 0) {
            //     this.setState({amount: amount}, this.setState({validAmount: true}))
            // }
            // else {
            //     this.setState({amount: 0},
            //         {validAmount: false})
            // }
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    percentValidation = (key, event) => {
        console.log(key)
        const percent = event.target.value
        let percentVal = +percent
        console.log(percentVal)
        let p = this.state.percentages
        console.log(p)
        if(!isNaN(percentVal)) {
            p[key] = percentVal
        } else {
            p[key] = 0
        }
        this.setState({percentages: p})
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
        const friends = this.state.newFriends
        friends[key] = true

        const keys = this.state.keys
        keys.push(key)

        const numFriends = this.state.numFriends
        // console.log(numFriends)

        const percentages = this.state.percentages
        percentages[key] = 0

        const friendFields = this.state.friendFields
        friendFields[key] = (
            <NewUserField
                global={this.props.global}
                uid={key}
                moneyReceiver={this.state.moneyReceiver}
                pasteOption={this.pasteOption}
                percentValidation={this.percentValidation}
            />
        ) 

        const filteredFriends = this.state.filteredFriends
        this.setState({newFriends:friends,
            keys: keys,
            numFriends:this.state.numFriends+1,
            filteredFriends: filteredFriends,
            friendFields: friendFields,
            percentages: percentages
        })
    }

    deleteFriendField = (event) => {
        let i= event.target.parentElement.parentElement.value
        console.log("value: ", i)
        // delete this.state.friendFields.i
        let fields = this.state.friendFields
        console.log(fields)
        delete fields[i]
        console.log(fields)

        // delete from moneyReceiver as well
        let recievers = this.state.moneyReceiver
        delete recievers[i]

        // delete from percentages
        let percentages = this.state.percentages
        delete percentages[i]

        this.setState({
            moneyReceiver: recievers},
            this.setState({
                friendFields: fields
            },
                this.setState({
                    percentages: percentages
                })
            )
        )
    }

    render() {
        console.log("rerendering")
        // console.log(this.state.numFriends)
        // console.log(this.state.filteredFriends)
        // console.log(this.state.keys[this.state.numFriends])
        // console.log(this.state.newFriends[this.state.keys[this.state.numFriends]])
        // let key = this.state.keys[this.state.numFriends]
        // let friendFields = this.state.friendFields
        return (
            <div className="bg-transparent w-screen h-screen shadow-lg fixed left-0 z-50">
            <div className="flex flex-col bg-black rounded md:w-1/3 w-1/2 h-auto max-h-1/2 shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-gray-800 ">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-white md:text-base text-sm">Split Money</span> 
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 md:text-base text-sm border-b p-2 h-1/2 overflow-scroll">
                    <div className='flex flex-col h-2/3'>
                        {/* Searching friends */}
                        <div className='my-2 flex flex-col' >
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
                        {/* {this.state.newFriends[this.state.keys[this.state.numFriends]] ? (
                            <NewUserField
                                global={this.props.global}
                                key={this.state.keys[this.state.numFriends]}
                                moneyReceiver={this.state.moneyReceiver}
                                pasteOption={this.pasteOption}
                                percentValidation={this.percentValidation}
                            />
                        ): null} */}
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
                        onClick={this.sendMoney}><b>Send</b></button>
                        <button className='ml-1 bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.requestMoney}><b>Request</b></button>
                        {/* This will trigger multiple backend calls which will reflect changes in transaction history, and user dashboard */}
                        <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.minimizePopUp}><b>Cancel</b></button>
                    </div>
                </div>
            </div>
            <div className="bg-black opacity-80 w-full h-full"></div>
            </div>
        );
    }
}
 
export default SplitPopUp;

