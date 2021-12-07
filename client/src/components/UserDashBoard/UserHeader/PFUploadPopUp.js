
import React, { Component } from "react";
 
class PFUploadPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: '',
            validAmount: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.friendsList,
            filteredFriends: this.props.friendsList,
            showResults: false,
            nameFilled: false,
        }
        this.amountValidation = this.amountValidation.bind(this)
        this.sendMoney = this.sendMoney.bind(this)
        // this.setMoneyReceiver = this.setMoneyReceiver(this)
        // this.setFilteredFriends = this.setFilteredFriends(this)
    }

    minimizePopUp = () => {
     this.props.minimizeUpload();
    };

    maxmizePopUp = () => {
        this.props.maximizeUpload();
    };

    amountValidation(event){
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    sendMoney(){
        if(this.state.validAmount && this.state.nameFilled){
            this.props.updateBalance(this.state.amount)
            this.props.minimizeSend()
        }  
    }

    setMoneyReceiver = (event)=> {
        // if(event.target.value === ''){
        //     this.setState({moneyReceiver:event.target.value},this.setState({filteredFriends:[]}))
        //     return
        // }
        this.setState({moneyReceiver: event.target.value}, this.setFilteredFriends)   
    }

    setFilteredFriends = () => {
        
        if(this.state.moneyReceiver === '') {
            this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
        }
        else{
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver.toString())))}, this.setState({showResults: true}))
        }
        
    }

    pasteOption = (event) => {
        console.log(event.target.value)
        this.setState(({showResults: false}), this.setState({filteredFriends: []}, this.setState({moneyReceiver: event.target.value},
            this.setState({nameFilled: true}))))
    } 

    

    render() {
        return (
            <div className="flex flex-col bg-white rounded md:w-1/3 w-1/2 h-auto border shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Upload Photo</span>
                        {/* <span className="ml-96" onClick={this.handleClick}>X</span> 
                        make the x into a button, not span */}
                    </div>
                    <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                        <div className='h-2/3'>
                            <div className='h-1/3 mt-2'>
                                Select Picture:
                                <input className="ml-8 w-44 pl-2" type='file' accept="image/*" placeholder="Picture"/> 
                                {/* Do a server side check for uploaded file format */}
                                {/* value={this.state.requestReceiver} 
                                store uploaded file and connect to backend*/}
                            </div>
                        </div>
                        <div className='w-1/1 mt-2 text-right'>
                            <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={() => alert('Uploaded')}>Upload</button>
                            <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.minimizePopUp}><b>Cancel</b></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PFUploadPopUp; 