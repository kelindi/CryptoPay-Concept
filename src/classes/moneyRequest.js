class moneyRequest {
	constructor(originUserName, destinationUserName,amount,timestamp) {
		this.originUserName = originUserName
        this.destinationUserName = destinationUserName
        this.amount = amount
        this.timestamp = timestamp
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

export default moneyRequest