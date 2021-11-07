import React, { Component } from 'react';

export const acceptRequest = (user, requestor) => {
    // user.friends.push(requestor)
    // console.log(user.friendRequests)
    // const newRequests = user.friendRequests.filter(r => {
    //     return r !== requestor
    // })
    // user.friendRequests = newRequests
    // console.log(user.friendRequests)

    // const newSenderRequests = requestor.sentRequests.filter(s => {
    //     return s !== user
    // })
    // requestor.sentRequests = newSenderRequests
    console.log(requestor)
        const tempUserFriends = user.friends
        tempUserFriends.push(requestor)
        user.setState({
            friends: tempUserFriends
        })

        const tempSenderFriends = requestor.friends
        tempSenderFriends.push(user)
        requestor.setState({
            friends: tempSenderFriends
        })

        console.log(user.friendRequests)
        const newRequests = user.friendRequests.filter(r => {
            return r !== requestor
        })
        user.setState({
            friendRequests: newRequests
        })
        console.log(user.friendRequests)
        console.log(user.friends)
        console.log(requestor.friends)
        
        const newSenderRequests = requestor.sentRequests.filter(s => {
            return s !== user
        })
        requestor.setState({
            sentRequests: newSenderRequests
        })
}

export const rejectRequest = (user, requestor) => {
    const newRequests = user.friendRequests.filter(r => {
        return r !== requestor
    })
    user.friendRequests = newRequests

    const newSenderRequests = requestor.sentRequests.filter(s => {
        return s !== user
    })
    requestor.sentRequests = newSenderRequests

}