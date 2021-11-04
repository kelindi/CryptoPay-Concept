import User from "./User"
import { uuid} from 'uuidv4';
import Admin from "./Admin";
import moneyRequest from "./moneyRequest";

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
        this.admin = new Admin('adminFirst','adminLast')
        this.loginDB = {'user':'user','user2':'user2','user3':'user3','user4':'user4','admin':'admin'}
        this.tokenDB = {'user':this.u1,'user2':this.u2,'user3':this.u3,'user4':this.u4,'admin':this.adminID}
        this.userDB = {[this.u1]:this.user1, [this.u2]: this.user2, [this.u3]: this.user3, [this.u4]:this.user4, [this.adminID]:this.admin}
        
        this.user1.requests.push(new moneyRequest(this.user1,this.user2,100,"10-01-2021"))
    }
	;

    addUser = (firstName, lastName, username, password) => {
        console.log(this.loginDB)
        let uid = uuid()
        this.loginDB[username] = password
        // this.loginDB.push({
        //     key: username,
        //     value: password
        // });
        this.tokenDB[username] = uid
        // this.tokenDB.push({
        //     key: username,
        //     value: uid
        // });
        this.userDB[[uid]] = new User(firstName, lastName, username, 0, '') //keeping default balance as 0 and no default wallet.
        // this.userDB.push({
        //     key: [uid],
        //     value: new User(firstName, lastName, username, 0, '') //keeping default balance as 0 and no default wallet.
        // });
        console.log(this.loginDB)
        
    }
    }
	    

export default Backend