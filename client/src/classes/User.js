
//uid
class User{
	constructor(firstName, lastName,userName,currentAccountBalance,walletAddress) {
		this.firstName = firstName
		this.lastName= lastName
        this.userName = userName

		// all this cannot be initialized when there is a backend, purely exposed for testing purposes
        this.friends = []
        this.transactions = []
		this.requests = []
		this.sentRequests = []
		this.sentFriendRequests =[]
		this.friendRequests =[]
        this.currentAccountBalance = currentAccountBalance
        this.walletAddress = walletAddress
		this.profilePicture = '/images/pfDefault.png' //change this to image url

	}

	//TODO
	requestMoney() {

		return 
	}

	//TODO
	sendMoney(){
		return 
	}

	//TODO
	approveRequest(){
		return
	}

	checkBalance(){
		return this.currentAccountBalance
	}

	addWalletaddress(){

	}
}

export default User