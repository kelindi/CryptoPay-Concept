import { Redirect } from "react-router";
import User from "./classes/User";
import { ethers } from "ethers";
import Admin from "./classes/Admin";

export const logout = (app) => {
    //const url = `https://crypt0pay.herokuapp.com/users/logout`
    const url = `http://localhost:5000/users/logout`

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const checkSession = async (app) => {
    //const url = `https://crypt0pay.herokuapp.com/users/check-session`
    const url = `http://localhost:5000/users/check-session`
    try{
        let res = await fetch(url);
        if (res.status === 200){
          let json = await res.json();
          console.log(json)
          if (json && json.userName) {
              if(json.isAdmin === false){
                let user = new User (json.firstName, json.lastName, json.userName)
                app.setState({ currentUser: user})
              }
              else{
                let admin = new Admin (json.firstName, json.lastName)
                app.setState({ currentUser:admin })
                console.log(app.state.currentUser)
              }
              
          }
        }
      }
      catch(error){
        console.log(error)
      }
    // fetch(url)
    // .then(res => {
    //     if(res.status === 200){
    //         return res.json();
    //     }
    // })
    // .then(json => {
    //     if(json && json.currentUser){
    //         // app.setState({ currentUser: json.currentUser })
    //         let provider = new ethers.providers.Web3Provider(window.ethereum);
    //         let signer = userData.provider.getSigner();
    //         let walletAddress = await userData.signer.getAddress();
    //         let userBalance = await userData.provider.getBalance(userData.wallet);
    //         userData.userBalance = ethers.utils.formatEther(userBalance);
    //         //getWalletInfo
    //         user = new User (json.firstName, json.lastName, json.userName, 0, )
    //         // getWalletInfo -> create new user -> update user data -> App.setState curUser = user

    //         // else{
    //         //     return <Redirect push to="/" />;
    //         // }
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // });



    // try{
    //     let res = await fetch(url);
    //     if (res.status === 200){
    //       let json = await res.json();
    //       if (json && json.currentUser) {
    //         this.setState({ currentUser: json.currentUser })
    //         // return window.location.assign("/userDashBoard")
    //         return <Redirect push to="/userDashBoard" />;
    //       }
    //       else{
    //         return <Redirect push to="/" />;
    //         // return window.location.assign("/")
    //       }
    //     }
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
}