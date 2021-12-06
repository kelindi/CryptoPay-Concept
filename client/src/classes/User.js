import cPayRequest from "../CryptoPayClient"
import Friend from "./Friend"
import MoneyRequest from "./MoneyRequest"
import FriendRequest from "./FriendRequest"

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
		this.incomngMoneyRequests = []
		this.sentFriendRequests =[]
		this.incomingFriendRequests =[]
		this.profilePicture = '/images/pfDefault.png'

	}

	updateData = async () =>{
		let {status, data} = await cPayRequest('moneyRequests/incoming/'+this.userName,'GET')
		if(status === 200){
			data.incomngMoneyRequests.forEach(request => {
				this.incomngMoneyRequests.push(new MoneyRequest(request._id,request.orginUser,request.destinationUser,request.destinationWallet,request.amount,request.date))
			})
		}
		(status, data) = await cPayRequest('moneyRequests/sent/'+this.userName,'GET')
		if(status === 200){
			data.sentMoneyRequests.forEach(request => {
				this.sentMoneyRequests.push(new MoneyRequest(request._id,request.orginUser,request.destinationUser,request.destinationWallet,request.amount,request.date))
			})
		}
		(status, data) = await cPayRequest('friendRequests/incoming/'+this.userName,'GET')
		if(status === 200){
			data.incomingFriendRequests.forEach(request => {
				this.incomingFriendRequests.push(new FriendRequest(request._id,request.orginUser,request.destinationUser,request.date))
			})
		}
		(status, data) = await cPayRequest('friendRequests/sent/'+this.userName,'GET')
		if(status === 200){
			data.sentFriendRequests.forEach(request => {
				this.sentFriendRequests.push(new FriendRequest(request._id,request.orginUser,request.destinationUser,request.date))
			})
		}
		(status, data) = await cPayRequest('/api/user/'+this.userName+"/friends",'GET')
		if(status === 200){
			data.friends.forEach(friend => {
				this.friends.push(new Friend(friend.firstName,friend.lastName,friend.userName,'/images/pfDefault.png',friend.walletAddress))
			})
		}
		(status, data) = await cPayRequest('/transactions/'+this.userName,'GET')
		if(status === 200){
			data.transactions.forEach(transaction => {
				this.transactions.push(new Transaction(transaction.orginUser,transaction.destinationUser,transaction.amount,transaction.date))
			})
		}

	}

	//TODO
	requestMoney = async ()  =>{
		const {status, data} = await cPayRequest('moneyRequests/','POST',{originuser:this.userName,destinationuser:this.userName,destinationwallet:this.walletAddress,amount:this.amount,date:new Date()})
		if (status !== 200) {
			console.log(data)
		}
		await this.updateData()
	}
	
	requestFriend = async (friendUserName) => {
		const {status, data} = await cPayRequest('friendRequests/','POST',{orginUser:this.userName,destinationUser:friendUserName,date:new Date()})
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