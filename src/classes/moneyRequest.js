class MoneyRequest {
	constructor(originUserName, destinationUserName,amount,date) {
		this.originUserName = originUserName
        this.destinationUserName = destinationUserName
        this.amount = amount
        this.date = date
		
	}

	acceptRequest() {
        // let the destination user accept this request, trigger a transaction

		return 1;
	}


    cancelRequest() {
        //let the origin user delete the request
		return 1;
	}
}

export default MoneyRequest