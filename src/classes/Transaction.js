import { uuid } from "uuidv4"

class Transaction {
	constructor(originUserName, destinationUserName,amount,date, time) {
		this.originUserName = originUserName
        this.destinationUserName = destinationUserName
        this.amount = amount
        this.date = date
		this.time = time
		this.id = uuid()

	}

	
	
}

export default Transaction