import React, { Component } from "react";
import MoneyRequestsTable from "./MoneyRequestsTable";
import ReportTable from "./ReportTable";
import TransactionTable from "./TransactionTable";
import UserTable from "./UserTable";
import { Route, Switch, BrowserRouter, Link, useLocation } from "react-router-dom";
class AdminDashBoard extends Component {
  constructor(props) {
    super(props);
  }

  removeOutline = (event) => {
    const navs = document.querySelectorAll(".navs")
    console.log(navs)
    navs.forEach((element) => {
      element.classList.remove("underline","animate-pulse")})
    event.target.classList.add("underline","animate-pulse")
  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser.moneyRequests)
    return (
      <BrowserRouter basename="/AdminDashBoard">
        <div className = "bg-gray-700 py-4">
          <ul className = "font-mono font-thin">
            <li className ={"inline px-3 text-2xl text-white"}>
              <Link onClick = {this.removeOutline} className = "navs underline animate-pulse" to="/reports">Reports</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutline} to="/users">Users</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutline} to="/moneyRequests">Moneyrequests</Link>
            </li>
            <li className = "inline px-3 text-2xl text-white ">
              <Link className = "navs" onClick = {this.removeOutline} to="/transactions">Transactions</Link>
            </li>
          </ul>
        </div>
        <Switch>
        <Route
            exact
            path="/"
            render={() => (
              <ReportTable
                reports={currentUser.reports}
                resolvedReports={currentUser.resolvedReports}
              ></ReportTable>
            )}
          />

          <Route
            exact
            path="/reports"
            render={() => (
              <ReportTable
                reports={currentUser.reports}
                resolvedReports={currentUser.resolvedReports}
              ></ReportTable>
            )}
          /> 

          <Route
            exact
            path="/users"
            render={() => (
              <UserTable users={currentUser.users}></UserTable>
            )}
          /> 

          <Route
            exact
            path="/moneyrequests"
            render={() => (

              <MoneyRequestsTable
                moneyRequests={currentUser.moneyRequests}
              ></MoneyRequestsTable>

            )}
          />

          <Route
            exact
            path="/transactions"
            render={() => (
              <TransactionTable
                transactions={currentUser.transactions}
              ></TransactionTable>
            )}
          />
        </Switch>
        <div className="overflow-hidden px-5"></div>
      </BrowserRouter>
    );
  }
}

export default AdminDashBoard;
