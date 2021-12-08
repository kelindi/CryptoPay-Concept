class Friend{
	constructor(firstName, lastName,userName,profilePicture,walletAddress) {
		this.firstName = firstName
		this.lastName= lastName
        this.userName = userName
        this.profilePicture = "https://avatars.dicebear.com/api/bottts/"+userName+".png"
		this.walletAddress = walletAddress

    }
}

export default Friend;