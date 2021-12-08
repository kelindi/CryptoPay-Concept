import cPayRequest from "../CryptoPayClient";
import MoneyRequest from "./MoneyRequest";

class Admin {
	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
		this.users = []
		this.reports = []
		this.transactions = []
		this.moneyRequests = []
	}

	updateAdminData = async () => {
		let {status, data} = await cPayRequest("/moneyRequests", "GET");
		if (status === 200 && data.length > 0){
			data.forEach(async (request) => {
				const mr = new MoneyRequest(request._id,request.originUser,request.destinationUser,request.destinationWallet,request.amount,request.date);
				console.log(this)
				this.moneyRequests.push(mr)
				await mr.getIncomingFirstLastName();
				await mr.getOutgoingFirstLastName();
			});
			// console.log(this.moneyRequests)
		}
	}
}

export default Admin