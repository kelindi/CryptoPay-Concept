import React, { Component } from 'react';
import FriendRequest from "./FriendRequest";
import SentFriendRequest from "./SentFriendRequest"
import { uuid } from 'uuidv4';
import IncomingMoneyRequest from './TransactionFeed/IncomingMoneyRequest'
import { acceptRequest } from './FriendRequestResponses'
import OutgoingMoneyRequest from './TransactionFeed/OutgoingMoneyTransaction';

/*
TODO

note: please use camelCaseCase
Classes need to have CapitalNames
Have descriptive function names like createSomething
Comment complex code

1. Friend Requests (incoming)
2. Incoming requests
    display request and whether you want to accept or reject
3. Outgoing requests 
    display that the request is pending and if the person rejected the request also give the option to rescind the request
4. Transactions
    shows sender receiver money and date 11-03-2021 and time

5. Add search bar with filter options (for transactions)


*/


class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            userFriends: this.props.currentUser.friends,
            userFriendRequests: this.props.currentUser.friendRequests,
            userSentRequests: this.props.currentUser.sentFriendRequests,
            userMoneyRequests: this.props.currentUser.requests,
            userSentMoneyRequests: this.props.currentUser.sentRequests,
            sendOpen: false
        }
        
    }

    handleAccept = requestor => {
        // event.preventDefault()
        const tempUserFriends = this.state.userFriends
        tempUserFriends.push(requestor)
        const newRequests = this.state.userFriendRequests.filter(r => {
            return r !== requestor
        })
        this.setState({
            userFriends: tempUserFriends
        }, // backend call to change friends list of user 
            // this.state.user.setState({
            //     friends: tempUserFriends
            // },
            this.setState({
                userFriendRequests: newRequests
            })
            
            // backend call to change friends requests of user 
            // this.state.user.setState({
            //     friendRequests: newRequests
            // })
        )
        this.props.changeFriendsList(tempUserFriends)
        this.props.changeIncomingFriendRequests(newRequests)
    }

    handleReject = requestor => {
        const newRequests = this.state.userFriendRequests.filter(r => {
            return r !== requestor
        })
        // user.friendRequests = newRequests
        this.setState({
            userFriendRequests: newRequests
        })
    
        // 

        // const newSenderRequests = requestor.sentRequests.filter(s => {
        //     return s !== user
        // })
        // requestor.sentRequests = newSenderRequests
    }

    handleRescind = requestee => {
        const newSentRequests = this.state.userSentRequests.filter(r => {
            return r !== requestee
        })
        this.setState({
            userSentRequests: newSentRequests
        })
    }

    sendPopOn = () => {
        this.setState({
            sendOpen: true,
        });
    }

    sendPopOff = () => {
        this.setState({
            sendOpen: false,
        });
    }



    render() {
        return (
            <div className="relative rounded-lg h-4/5 bg-gray-300 opacity-75">
                {/* Container Div */}
                <div className="float-left border-2 border-blue-300 border-opacity-100 overflow-y-auto rounded-xl h-1/6 w-1/2 bg-color bg-blue-200 ">
                    {/* div for incoming requests */}
                    <div className="font-sans text-blue-700 text-xl font-light tracking-widest text-center">INCOMING FRIEND REQUESTS</div>
                    {/* <FriendRequest user={this.props.currentUser} /> */}
                    {this.state.userFriendRequests.map(requestor => (
                       
                            <FriendRequest
                                key={uuid()}
                                user={this.state.user}
                                requestor={requestor}
                                acceptRequest={this.handleAccept}
                                rejectRequest={this.handleReject}
                            />
                    ))}

                    {/* For testing */}
                    {/* <FriendRequest
                        key={uuid()}
                        user={this.props.currentUser.friendRequests[0]}/>
                    
                    <FriendRequest
                        key={uuid()}
                        user={this.props.currentUser.friendRequests[0]}/>
                    
                    <FriendRequest
                        key={uuid()}
                        user={this.props.currentUser.friendRequests[0]}/> */}


                    {/* {
                        displayName = (user) =>{
                        console.log(user)
                        }
                    }   */}

                </div>
                <div className="float-right border-2 border-blue-300 border-opacity-100 overflow-y-auto rounded-xl h-1/6 w-1/2 bg-color bg-blue-100">
                    {/* div for outgoing requests */}
                    <div className="font-sans text-blue-700 text-xl font-light tracking-widest text-center">OUTGOING FRIEND REQUESTS</div>
                    {this.state.userSentRequests.map(requestee => (
                        <SentFriendRequest
                            key={uuid()}
                            user={this.state.user}
                            requestee={requestee} 
                            rescindRequest={this.handleRescind}/>
                        // console.log(user.firstName)
                    ))}
                </div>

                <div className="absolute border-2 border-blue-300 border-opacity-100 bottom-0 rounded-xl h-5/6 w-full bg-color bg-blue-300">
                    <div className="float-left border-2 border-blue-300 border-opacity-100 overflow-y-auto rounded-xl h-1/3 w-1/2 bg-color bg-blue-100 opacity-90">
                        <div className="font-sans text-blue-700 text-xl font-light tracking-widest text-center">INCOMING MONEY REQUESTS</div>
                        {this.state.userMoneyRequests.map(request => (
                            <IncomingMoneyRequest
                                key={uuid()}
                                request={request}
                            />
                        ))}
                    </div>
                    <div className="float-right border-2 border-blue-300 border-opacity-100 overflow-y-auto rounded-xl h-1/3 w-1/2 bg-color bg-blue-100 opacity-90">
                        <div className="font-sans text-blue-800 text-xl font-light tracking-widest text-center">OUTGOING MONEY REQUESTS</div>
                        {this.state.userSentMoneyRequests.map(request => (
                            <OutgoingMoneyRequest
                                key={uuid()}
                                request={request}    
                            />
                        ))}
                    </div>
                    {/* div for rest of the feed */}

                </div>
            </div>

        );
    }
}

export default UserFeed;