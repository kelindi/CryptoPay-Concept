
import React, { Component } from "react";
import cPayRequest from "../../../CryptoPayClient";
 
class PFUploadPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: '',
            validAmount: false,
            currentUser: this.props.currentUser,
            userFriends: this.props.friendsList,
            filteredFriends: this.props.friendsList,
            showResults: false,
            nameFilled: false,
        }
        // this.setMoneyReceiver = this.setMoneyReceiver(this)
        // this.setFilteredFriends = this.setFilteredFriends(this)
    }

    minimizePopUp = () => {
     this.props.minimizeUpload();
    };

    maxmizePopUp = () => {
        this.props.maximizeUpload();
    };

    uploadPhoto = async (event) => {
        event.preventDefault()
        // alert('Uploaded')
        let inputTag = document.querySelector("#uploadFile")
        // console.log(inputTag)
        let files = inputTag.files
        // console.log(URL.createObjectURL(files[0]))
        // console.log(files.length)
        // console.log(this.props.global.profilePicture)
        if(files.length !== 0) {
            // alert("selected file name: " + files[0].name)
            let photo = {
                photo: 'yo' // may not be used
            }
            // check if file is an image

            // 2 server calls: - post image as image model and - update user
            // this.props.global.profilePicture need to be updated
            console.log('/users/ProfilePhoto/' + this.props.global.userName)
            const { status, data } = await cPayRequest(
                '/users/ProfilePhoto/' + this.props.global.userName,
                'patch',
                photo
            );
            console.log("iedufghoduifghuidzfg");
            if (status === 200) {
                alert("uploaded");
            };
        } else {
            alert("No File Selected");
        };
        this.minimizePopUp();
    };
    

    render() {
        return (
            <div className="flex flex-col bg-white rounded md:w-1/3 w-1/2 h-auto border shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-blue-300 text-black">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Update Profile Photo</span>
                        {/* <span className="ml-96" onClick={this.handleClick}>X</span> 
                        make the x into a button, not span */}
                    </div>
                    <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                        <div className='h-2/3'>
                            <div className='h-1/3 mt-2'>
                                Select Picture:
                                <input id="uploadFile" className="ml-8 w-44 pl-2" type='file' accept="image/*" placeholder="Picture"/> 
                                {/* Do a server side check for uploaded file format */}
                                {/* value={this.state.requestReceiver} 
                                store uploaded file and connect to backend*/}
                            </div>
                        </div>
                        <div className='w-1/1 mt-2 text-right'>
                            <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.uploadPhoto}>Upload</button>
                            <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                            onClick={this.minimizePopUp}><b>Cancel</b></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PFUploadPopUp; 