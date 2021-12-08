import React, { Component } from 'react';

class SentFriendRequest extends Component{
    constructor(props){
        super(props)
        this.state ={
            requestee: this.props.requestee
        }
    }

    render(){
        const { user,requestee, rescindRequest } = this.props;
        return(
            <div className="relative rounded-2xl w-full h-20 bg-gray-100 mt-2">
                <div className="absolute float-left rounded-full h-20 w-20">
                    <img className="float-left absolute rounded-full h-20 w-20 flex px-3 py-3 items-center
                    justify-center" src={"https://avatars.dicebear.com/api/bottts/"+requestee.userName+".png"}></img>
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
                    <div className="float-left tracking-wide text-center"><b>{requestee.firstName}</b> {requestee.lastName}   <small>({requestee.userName})</small></div> <br/>
                    <div className="h-13 w-full bg-blue-800">
                        <button className="float-left bg-red-600 opacity-80 rounded-2xl w-1/3 py-1"
                                onClick={() => this.props.rescindRequest(this.state.requestee)}>Rescind</button>
                    </div>
                    {/* <button className="float-right -left-10">Accept</button> */}
                    {/* <button className="float-right"> Reject</button> */}
                </div>
                
            </div>
        )
        
    }
}

export default SentFriendRequest;