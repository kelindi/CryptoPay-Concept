import { uuid } from "uuidv4"
import cPayRequest from "../CryptoPayClient";

class Report {
	constructor(submitter, reportedUser,reason,date,time, id, comment='') {
		this.submitter = submitter
        this.reportedUser = reportedUser
        this.reason = reason
        this.date = date
		this.time = time
		this.id = id
        this.resolvedComment = comment

	}

	resolveReport = () => {
		console.log(this.resolvedComment)
		cPayRequest(/reports/ + this.id, "PATCH", {
			comment: this.resolvedComment
		});
		return 1;
	  };
}

export default Report