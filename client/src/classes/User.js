import cPayRequest from "../CryptoPayClient"
import Friend from "./Friend"
import MoneyRequest from "./MoneyRequest"
import FriendRequest from "./FriendRequest"
import Transaction from "./Transaction"

//uid
class User{
	constructor(firstName, lastName,userName,currentAccountBalance,walletAddress,signer,provider) {
		this.firstName = firstName
		this.lastName= lastName
        this.userName = userName
		this.currentAccountBalance = currentAccountBalance
		this.walletAddress = walletAddress
		this.signer = signer
		this.provider = provider

		// all this cannot be initialized when there is a backend, purely exposed for testing purposes
		this.friends = []
        this.transactions = []
		this.sentMoneyRequests = []
		this.incomingMoneyRequests = []
		this.sentFriendRequests =[]
		this.incomingFriendRequests =[]
		this.profilePicture = '/images/pfDefault.png'

	}
	

	updateData = async () =>{
		let {status, data} = await cPayRequest('/moneyRequests/incoming/'+this.userName,'GET');
		if(status === 200 && data.length > 0){
			data.forEach(request => {
				this.incomingMoneyRequests.push(new MoneyRequest(request._id,request.originUser,request.destinationUser,request.destinationWallet,request.amount,request.date))
			});
			console.log(this.incomingMoneyRequests)
		};
		
		({status, data} = await cPayRequest('/moneyRequests/outgoing/'+this.userName,'GET'));

		if(status === 200 && data.length > 0){
			data.forEach(request => {
				console.log(this)
				this.sentMoneyRequests.push(new MoneyRequest(request._id,request.originUser,request.destinationUser,request.destinationWallet,request.amount,request.date))
				console.log(this)
			});
		};
		({status, data} = await cPayRequest('/friendRequests/incoming/'+this.userName,'GET'));
		if(status === 200 && data.length > 0){
			data.forEach(request => {
				this.incomingFriendRequests.push(new FriendRequest(request._id,request.originUser,request.destinationUser,request.date))
			});
		};
		({status, data} = await cPayRequest('/friendRequests/outgoing/'+this.userName,'GET'));
		if(status === 200 && data.length > 0){
			data.forEach(request => {
				this.sentFriendRequests.push(new FriendRequest(request._id,request.originUser,request.destinationUser,request.date))
			});
		};
		({status, data} = await cPayRequest('/api/user/'+this.userName+"/friends",'GET'));
		if(status === 200 && data.length > 0){
			data.forEach(friend => {
				this.friends.push(new Friend(friend.firstName,friend.lastName,friend.userName,'/images/pfDefault.png',friend.walletAddress))
			});
		};
		({status, data} = await cPayRequest('/transactions/'+this.userName,'GET'));
		if(status === 200 && data.length > 0){
			data.forEach(transaction => {
				this.transactions.push(new Transaction(transaction.originUser,transaction.destinationUser,transaction.amount,transaction.date))
			});
		};

	};

	//TODO
	requestMoney = async ()  =>{
		const {status, data} = await cPayRequest('moneyRequests/','POST',{originuser:this.userName,destinationuser:this.userName,destinationwallet:this.walletAddress,amount:this.amount,date:new Date().toJSON().slice(0,10).replace(/-/g,'/')})
		if (status !== 200) {
			console.log(data)
		}
		await this.updateData()
	}
	
	requestFriend = async (friendUserName) => {
		const {status, data} = await cPayRequest('friendRequests/','POST',{orginUser:this.userName,destinationUser:friendUserName,date:new Date().toJSON().slice(0,10).replace(/-/g,'/')})
		if (status !== 200) {
			console.log(data)
		}
		await this.updateData()


	}

	addWalletaddress = async () =>{
		const {status, data} = await cPayRequest('/users/updateWalletAddress/'+this.userName,'PATCH',{walletAddress:this.walletAddress})
		if (status !== 200) {
			console.log(data)
		}
		await this.updateData()
	}
}

export default User