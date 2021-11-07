import React, { Component } from 'react';
import { acceptRequest, rejectRequest } from "./FriendRequestResponses";

class FriendRequest extends Component{
    constructor(props){
        super(props)
        this.state ={
            requestor: this.props.requestor
        }
    }

    // handleAccept(event){
    //     event.preventDefault()
    //     console.log(this.state.requestor)
    //     const tempUserFriends = this.state.userFriends
    //     tempUserFriends.push(this.state.requestor)
    //     this.setState({
    //         userFriends: tempUserFriends
    //     }, // backend call to change friends list of user 
    //     // this.state.user.setState({
    //     //     friends: tempUserFriends
    //     // }, 
    //     () => {
    //         console.log(this.state.user.friendRequests)
    //         const newRequests = this.state.userFriendRequests.filter(r => {
    //             return r !== this.state.requestor
    //         })
    //         this.setState({
    //             userFriendRequests: newRequests
    //         })
    //         // backend call to change friends requests of user 
    //         // this.state.user.setState({
    //         //     friendRequests: newRequests
    //         // })
    //         console.log(this.friendRequests)
    //         console.log(this.state.user.friends)
    //         console.log(this.state.requestor.friends)
    //     }
    //     ) 

        // this is backend remove from this phase
        // const tempSenderFriends = this.state.requestor.friends
        // tempSenderFriends.push(this.state.user)
        // this.state.requestor.setState({
        //     friends: tempSenderFriends
        // })

        // console.log(this.state.user.friendRequests)
        // const newRequests = this.state.user.friendRequests.filter(r => {
        //     return r !== this.state.requestor
        // })
        // this.state.user.setState({
        //     friendRequests: newRequests
        // })
        // console.log(this.state.user.friendRequests)
        // console.log(this.state.user.friends)
        // console.log(this.state.requestor.friends)
        
        // this is backend, we will take care of this in phase 2
        // const newSenderRequests = this.state.requestor.sentRequests.filter(s => {
        //     return s !== this.state.user
        // })
        // this.state.requestor.setState({
        //     sentRequests: newSenderRequests
        // })
    // }

    render(){
        // const { user,requestor, acceptRequest } = this.props;
        const { user,requestor, acceptRequest } = this.props;
        return(
            <div className="relative rounded-2xl w-full h-20 bg-gray-100 mt-2">
                <div className="absolute float-left rounded-full h-20 w-20">
                    <img className="float-left absolute rounded-full h-20 w-20 flex px-3 py-3 items-center
                    justify-center" src={user.profilePicture}></img>
                </div>
                {/* <div className="float-right font-bold tracking-widest text-center top-3">{this.props.user.firstName}</div> */}
                {/* <div className="relative float-right w-10/12 bg-blue-500">
                    <div className="absolute float-left font-bold tracking-widest text-center top-3">{this.props.user.firstName}</div> <br/>
                    <div className="absolute float-left font-light tracking-widest text-center top-9">{this.props.user.lastName}</div>
                    <div className="float-right h-13 w-1/2 bg-blue-800 top-3">Hello</div> */}
                    {/* <button className="float-right -left-10">Accept</button> */}
                    {/* <button className="float-right"> Reject</button> */}
                {/* </div> */}
                <div className="relative float-right top-2 w-10/12">
                    <div className="float-left tracking-wide text-center"><b>{user.firstName}</b> {user.lastName}     <small>({user.userName})</small></div> <br/>
                    <div className="h-13 w-1/2 bg-blue-800">
                        {/* <button className="float-left bg-green-400 opacity-75 w-1/2 py-1 rounded-2xl" 
                                onClick = {(user, requestor) => {
                                    console.log(requestor)
                                    user.friends.push(requestor)
                                    console.log(user.friendRequests)
                                    const newRequests = user.friendRequests.filter(r => {
                                        return r !== requestor
                                    })
                                    user.friendRequests = newRequests
                                    console.log(user.friendRequests)

                                    const newSenderRequests = requestor.sentRequests.filter(s => {
                                        return s !== user
                                    })
                                    requestor.sentRequests = newSenderRequests
                                    }}>Accept</button> */}
                        <button className="float-left bg-green-400 opacity-75 w-1/2 py-1 rounded-2xl" 
                                onClick = {() => this.props.acceptRequest(this.state.requestor)}>Accept</button>
                        <button className="float-right bg-red-600 opacity-80 rounded-2xl w-1/2 py-1">Reject</button>
                    </div>
                    {/* <button className="float-right -left-10">Accept</button> */}
                    {/* <button className="float-right"> Reject</button> */}
                </div>
                
            </div>
        )
        
    }
}

export default FriendRequest;