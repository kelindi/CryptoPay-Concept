import { uuid } from "uuidv4"

class Report {
	constructor(submitter, reportedUser,reason,date,time, id) {
		this.submitter = submitter
        this.reportedUser = reportedUser
        this.reason = reason
        this.date = date
		this.time = time
		this.id = id
        this.resolvedComment = ''

	}
}

export default Report