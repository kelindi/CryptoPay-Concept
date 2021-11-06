import React, { Component } from 'react';

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterFirstName: '',
            filterLastName: '',
            filterUserName:'',
            filterWalletAddress:'',
            //retreive all the transactions from the backend
            users: this.props.users,
            masterUsers: this.props.users
        }
        this.filterFirstNameChange = this.filterFirstNameChange.bind(this)
        this.filterLastNameChange = this.filterLastNameChange.bind(this)
        this.filterUserNameChange = this.filterUserNameChange.bind(this)
        this.filterWalletAddressChange = this.filterWalletAddressChange.bind(this)
        this.filter = this.filter.bind(this)
        this.editMode = this.editMode.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
    }
    filter(){
        const filteredUsers = this.state.masterUsers.filter(u=>
            (u.firstName.toString().includes(this.state.filterFirstName.toString()) || this.state.filterFirstName == '')
            &&
            (u.lastName.toString().includes(this.state.filterLastName.toString()) || this.state.filterLastName == '')
            &&
            (u.userName.toString().includes(this.state.filterUserName.toString()) || this.state.filterUserName == '')
            &&
            (u.walletAddress.toString().includes(this.state.filterWalletAddress.toString()) || this.state.filterWalletAddress == '')            
        )
        this.setState({users:filteredUsers})
    }

    filterFirstNameChange(event){
        this.setState({filterFirstName: event.target.value}, () => {
            this.filter()
        })

    }

    filterLastNameChange(event){
        this.setState({filterLastName: event.target.value}, () => {
            this.filter()
        })
        
    }
    filterUserNameChange(event){
        this.setState({filterUserName: event.target.value}, () => {
            this.filter()
        })
        
    }
    filterWalletAddressChange(event){
        this.setState({filterWalletAddress: event.target.value}, () => {
            this.filter()
        })
        
    }
    
    editMode(user,event){
        // hide edit button
        event.target.classList.add("hidden")

        //make all the cells we want to edit editable
        let divs = document.querySelectorAll("."+user.userName.toString())
        divs.forEach((div) => {
            div.setAttribute("contenteditable","true")
            div.classList.add("border", "border-black-500", "rounded-md","mx-2")
        })

        //show the save button
        document.querySelector("."+user.userName.toString()+"savebutton").classList.remove("hidden")
    }

    saveEdit(user,event){
        //hide save button
        event.target.classList.add("hidden")

        //make all the editable cells uneditable
        let divs = document.querySelectorAll("."+user.userName.toString()) 
        divs.forEach((div) => {
            div.setAttribute("contenteditable","false")
            div.classList.remove("border", "border-black-500", "rounded-md","mx-2")
        })

        //show edit button
        document.querySelector("."+user.userName.toString()+"editbutton").classList.remove("hidden")

        //call server and update user information
        user.firstName = divs[0].innerHTML
        user.lastName = divs[1].innerHTML
        user.userName = divs[2].innerHTML
    }
    
    

    render() {
        return (
            <div className="font-sans">
                <div className = "border text-center text-2xl">USERS</div>
                <table className = "w-full">
                    <thead>
                        <tr>
                            <th className = "px-1 py-2 border text-center">Profile Picture</th>
                            <th className = "px-1 py-2 border text-center">First Name
                                <input value = {this.filterFirstName} onChange = {this.filterFirstNameChange} className = "block m-auto border rounded-md"></input>
                            </th>
                            <th className = "px-1 py-2 border text-center">Last Name
                                <input value = {this.filterLastName} onChange = {this.filterLastNameChange} className = "block m-auto border rounded-md"></input>
                            </th>
                            <th className = "px-1 py-2 border text-center">Username
                                <input value = {this.filterUserName} onChange = {this.filterUserNameChange} className = "block m-auto border rounded-md"></input>
                            </th>
                            <th className = "px-1 py-2 border text-center">Wallet Address
                                <input value = {this.filterWalletAddress} onChange = {this.filterWalletAddressChange} className = "block m-auto border rounded-md"></input>
                            </th>
                            <th className = "px-1 py-2 border text-center"> Account Balance</th>
                            <th className = "px-1 py-2 border text-center">Edit</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.state.users.map((user) =>{
                        return(
                        <tr key = {user.userName}>
                            <td className = "px-0.5 py-1 border text-center"><img className='m-auto w-10 h-10 rounded-full flex items-center justify-center' src={user.profilePicture}/></td>
                            <td className = "px-0.5 py-1 border text-center"><div className = {user.userName.toString()}>{user.firstName.toString()}</div></td>
                            <td className = "px-0.5 py-1 border text-center"><div className = {user.userName.toString()}>{user.lastName.toString()}</div></td>
                            <td className = "px-0.5 py-1 border text-center"><div className = {user.userName.toString()}>{user.userName.toString()}</div></td>
                            <td className = "px-0.5 py-1 border text-center">{user.walletAddress.toString()}</td>
                            <td className = "px-0.5 py-1 border text-center">{ '$'+user.currentAccountBalance.toString()}</td>
                            <td className = "px-0.5 py-1 border text-center mx-2"><button className ={user.userName.toString()+"editbutton" +" bg-red-500 border border-black rounded-2xl px-2 py-1"} onClick = {(event) => this.editMode(user,event)}>Edit</button> <button onClick = {(event) => this.saveEdit(user,event)} className ={user.userName.toString()+"savebutton" +" hidden bg-green-500 border border-black rounded-2xl px-2 py-1"}> Save </button></td>
                        </tr>
                        )})}
                    </tbody>
                </table>    
            </div>
          );
    
}
}
 
export default UserTable;