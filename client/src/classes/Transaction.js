import { uuid } from "uuidv4"

class Transaction {
	constructor(originUser, destinationUser,amount,date, time, id) {
		this.originUser = originUser
        this.destinationUser = destinationUser
        this.amount = amount
        this.date = date
		this.time = time
		this.id = id
	}

	
	
}

export default Transaction