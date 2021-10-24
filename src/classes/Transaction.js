class Transaction {
	constructor(originUserName, destinationUserName,amount,timestamp) {
		this.originUserName = originUserName
        this.destinationUserName = destinationUserName
        this.amount = amount
        this.timestamp = timestamp
	}

	sendTransaction() {
		//move money from originUsername to destination username
		return 1;
	}

	
}

export default Transaction