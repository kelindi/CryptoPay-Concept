
//uid
class User{
	constructor(firstName, lastName,userName) {
		this.firstName = firstName
		this.lastName= lastName
        this.userName = userName
        this.friends = []
        this.transactions = []
        this.currentAccountBalance = 0
        this.walletAddress = ''
		this.profilePicture = '' //change this to image url

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