import User from "./User"
import { uuid} from 'uuidv4';

class Backend {
	constructor() {
		this.u1 = uuid()
        this.u2 = uuid()
        this.u3 = uuid()
        this.u4 = uuid()
        this.adminID = uuid()
        this.user1 = new User('firstName','lastName','user',1001,'wallet1')
        this.user2 = new User('firstName2','lastName2','user2',2002,'wallet2')
        this.user3 = new User('firstName3','lastName3','user3',3003,'wallet3')
        this.user4 = new User('firstName4','lastName4','user4',4004,'wallet4')
        this.loginDB = {'user':'user','user2':'user2','user3':'user3','user4':'user4','admin':'admin'}
        this.tokenDB = {'user':this.u1,'user2':this.u2,'user3':this.u3,'user4':this.u4,'admin':this.adminID}
        this.userDB = {[this.u1]:this.user1, [this.u2]: this.user2, [this.u3]: this.user3, [this.u4]:this.user4, [this.adminID]:"Not made yet"}
        this.currentUser = ''
    }
	};

    
	    


export default Backend