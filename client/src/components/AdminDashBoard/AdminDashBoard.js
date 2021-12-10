import React, { Component } from "react";
import MoneyRequestsTable from "./MoneyRequestsTable";
import ReportTable from "./ReportTable";
import TransactionTable from "./TransactionTable";
import UserTable from "./UserTable";
import { Route, Switch, BrowserRouter, Link, useLocation } from "react-router-dom";
import Loading from "../Loading";
class AdminDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotAdmin: false,
      currentUser: this.props.currentUser,
      mode: 0
    }
  }

  componentDidMount = () => {
    this.updateAdminData()
  }

  updateAdminData = async () => {
    await this.props.currentUser.updateAdminData();
    this.setState({
                  gotAdmin:true
                  })
  }
  
  // render based on value of 

  // removeOutline = (event) => {
  //   const navs = document.querySelectorAll(".navs")
  //   console.log(navs)
  //   navs.forEach((element) => {
  //     element.classList.remove("underline","animate-pulse")})
  //   event.target.classList.add("underline","animate-pulse")
  // }
  removeOutlineMode0 = (event) => {
    const navs = document.querySelectorAll(".navs")
    console.log(navs)
    navs.forEach((element) => {
      element.classList.remove("underline","animate-pulse")})
    event.target.classList.add("underline","animate-pulse")
    this.setState({mode:0})
  }

  removeOutlineMode1 = (event) => {
    const navs = document.querySelectorAll(".navs")
    console.log(navs)
    navs.forEach((element) => {
      element.classList.remove("underline","animate-pulse")})
    event.target.classList.add("underline","animate-pulse")
    this.setState({mode:1})
  }

  removeOutlineMode2 = (event) => {
    const navs = document.querySelectorAll(".navs")
    console.log(navs)
    navs.forEach((element) => {
      element.classList.remove("underline","animate-pulse")})
    event.target.classList.add("underline","animate-pulse")
    this.setState({mode:2})
  }

  removeOutlineMode3 = (event) => {
    const navs = document.querySelectorAll(".navs")
    console.log(navs)
    navs.forEach((element) => {
      element.classList.remove("underline","animate-pulse")})
    event.target.classList.add("underline","animate-pulse")
    this.setState({mode:3})
  }

  render() {
    const { currentUser } = this.props;
    
    if(this.state.gotAdmin === false){
      return (<Loading></Loading>)
    }
    console.log(currentUser.users)
    return (
      // <div>
      //   <div className = "bg-gray-700 py-4">
      //     <ul className = "font-mono font-thin">
      //       <li className ={"inline px-3 text-2xl text-white"}>
      //         <Link onClick = {this.removeOutline} className = "navs underline animate-pulse" to="/reports">Reports</Link>
      //       </li>
      //       <li className = "inline px-3 text-2xl text-white ">
      //         <Link className = "navs" onClick = {this.removeOutline} to="/users">Users</Link>
      //       </li>
      //       <li className = "inline px-3 text-2xl text-white ">
      //         <Link className = "navs" onClick = {this.removeOutline} to="/moneyRequests">Moneyrequests</Link>
      //       </li>
      //       <li className = "inline px-3 text-2xl text-white ">
      //         <Link className = "navs" onClick = {this.removeOutline} to="/transactions">Transactions</Link>
      //       </li>
      //     </ul>
      //   </div>
      //   <Switch>
      //   <Route
      //       exact
      //       path="/"
      //       render={() => (
      //         <ReportTable
      //           reports={currentUser.reports}
      //           resolvedReports={currentUser.resolvedReports}
      //         ></ReportTable>
      //       )}
      //     />

      //     <Route
      //       exact
      //       path="/reports"
      //       render={() => (
      //         <ReportTable
      //           reports={currentUser.reports}
      //           resolvedReports={currentUser.resolvedReports}
      //         ></ReportTable>
      //       )}
      //     /> 

      //     <Route
      //       exact
      //       path="/users"
      //       render={() => (
      //         <UserTable users={currentUser.users}></UserTable>
      //       )}
      //     /> 

      //     <Route
      //       exact
      //       path="/moneyrequests"
      //       render={() => (

      //         <MoneyRequestsTable
      //           moneyRequests={currentUser.moneyRequests}
      //         ></MoneyRequestsTable>

      //       )}
      //     />

      //     <Route
      //       exact
      //       path="/transactions"
      //       render={() => (
      //         <TransactionTable
      //           transactions={currentUser.transactions}
      //         ></TransactionTable>
      //       )}
      //     />
      //   </Switch>
      //   <div className="overflow-hidden px-5"></div>
      // </div>
      <div>
        <div className = "bg-gray-700 py-4">
          <ul className = "font-mono font-thin">
            <li className ={"inline px-3 text-2xl text-white"}>
              <Link onClick = {this.removeOutlineMode0} className = "navs underline animate-pulse" to="/">Reports</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutlineMode1} to="/">Users</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutlineMode2} to="/">Moneyrequests</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutlineMode3} to="/">Transactions</Link>
            </li>
          </ul>
        </div>
        <Route
            exact
            path="/"
            render={() => (
              this.state.mode === 0 ?   
              <ReportTable
                reports={currentUser.reports}
                resolvedReports={currentUser.resolvedReports}
              ></ReportTable> : this.state.mode === 1 ? 
              <UserTable users={currentUser.users}
              ></UserTable> : this.state.mode === 2 ?
              <MoneyRequestsTable
                moneyRequests={currentUser.moneyRequests}
              ></MoneyRequestsTable>: 
              <TransactionTable
                transactions={currentUser.transactions}
              ></TransactionTable>
            )}
          />

      </div>
    );
  }
}

export default AdminDashBoard;
