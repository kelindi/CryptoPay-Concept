import React, { Component } from "react";
import ReportTable from "./ReportTable";
import TransactionTable from "./TransactionTable";
import UserTable from "./UserTable";

class AdminDashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overflow-hidden px-5">
        <ReportTable reports = {this.props.backend.reports} resolvedReports = {this.props.backend.resolvedReports}></ReportTable>
        <UserTable users={this.props.backend.users}></UserTable>
        <TransactionTable
          transactions={this.props.backend.transactions}
        ></TransactionTable>
      </div>
    );
  }
}

export default AdminDashBoard;
