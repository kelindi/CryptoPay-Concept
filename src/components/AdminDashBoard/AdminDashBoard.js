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

  render() {
    return (
      <BrowserRouter basename="/AdminDashBoard">
        <div className = "bg-gray-700">
          <ul className = "font-mono">
            <li className ={"inline px-3 text-2xl underline text-white"}>
              <Link to="/reports">Reports</Link>
            </li>
            <li className = "inline px-3 text-2xl underline text-white ">
              <Link to="/users">Users</Link>
            </li>
            <li className = "inline px-3 text-2xl underline text-white ">
              <Link to="/moneyRequests">Moneyrequests</Link>
            </li>
            <li className = "inline px-3 text-2xl underline text-white ">
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </div>
        <Switch>
        <Route
            exact
            path="/"
            render={() => (
              <ReportTable
                reports={this.props.backend.reports}
                resolvedReports={this.props.backend.resolvedReports}
              ></ReportTable>
            )}
          />
          <Route
            exact
            path="/reports"
            render={() => (
              <ReportTable
                reports={this.props.backend.reports}
                resolvedReports={this.props.backend.resolvedReports}
              ></ReportTable>
            )}
          />

          <Route
            exact
            path="/users"
            render={() => (
              <UserTable users={this.props.backend.users}></UserTable>
            )}
          />

          <Route
            exact
            path="/moneyrequests"
            render={() => (
              <MoneyRequestsTable
                moneyRequests={this.props.backend.moneyRequests}
              ></MoneyRequestsTable>
            )}
          />

          <Route
            exact
            path="/transactions"
            render={() => (
              <TransactionTable
                transactions={this.props.backend.transactions}
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
