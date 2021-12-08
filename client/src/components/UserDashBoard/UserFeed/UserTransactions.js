import React, { Component } from "react";

class UserTransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDestination: "",
      filterAmount: "",
      filterDate: "",
      filterTime: "",
      filterID: "",
      //retreive all the transactions from the backend
      transactions: this.props.global.transactions,
      masterTransactions: this.props.global.transactions,
    };
    this.filterDestinationChange = this.filterDestinationChange.bind(this);
    this.filterAmountChange = this.filterAmountChange.bind(this);
    this.filterDateChange = this.filterDateChange.bind(this);
    this.filterTimeChange = this.filterTimeChange.bind(this);
    this.filterIDChange = this.filterIDChange.bind(this);
    this.filter = this.filter.bind(this);
  }
  componentDidMount(){
    this.filter()
  }
  filter() {
    const filteredTransactions = this.state.masterTransactions.filter(
      (t) =>
        t.originUser.userName ===
          this.props.global.userName &&
        (t.destinationUser.userName
          .toString()
          .includes(this.state.filterDestination.toString()) ||
          this.state.filterDestination == "") &&
        (t.amount.toString() == this.state.filterAmount.toString() ||
          this.state.filterAmount === "") &&
        (t.date.toString().includes(this.state.filterDate.toString()) ||
          this.state.filterDate === "") &&
        (t.time == this.state.filterTime.toString() ||
          this.state.filterTime === "") &&
        (t.id.toString().includes(this.state.filterID.toString()) ||
          this.state.filterID === "")
    );
    this.setState({ transactions: filteredTransactions }, () =>
      console.log(this.state.transactions)
    );
  }

  filterDestinationChange(event) {
    this.setState({ filterDestination: event.target.value }, () => {
      this.filter();
    });
  }
  filterAmountChange(event) {
    this.setState({ filterAmount: event.target.value }, () => {
      this.filter();
    });
  }
  filterDateChange(event) {
    this.setState({ filterDate: event.target.value.toString() }, () => {
      this.filter();
    });
  }
  filterTimeChange(event) {
    this.setState({ filterTime: event.target.value }, () => {
      this.filter();
    });
  }
  filterIDChange(event) {
    this.setState({ filterID: event.target.value }, () => {
      this.filter();
    });
  }

  render() {
    return (
      <div className="font-sans font-light shadow-2xl">
        <div className="text-center text-3xl py-4">TRANSACTIONS</div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">
                Destination
                <input
                  value={this.filterDestination}
                  onChange={this.filterDestinationChange}
                  className="block self-center border rounded-md m-auto"
                ></input>
              </th>
              <th className="px-4 py-2 border text-center">
                Amount
                <input
                  value={this.filterAmount}
                  onChange={this.filterAmountChange}
                  className="block self-center border rounded-md m-auto"
                ></input>
              </th>
              <th className="px-4 py-2 border text-center">
                Date
                <input
                  value={this.filterDate}
                  onChange={this.filterDateChange}
                  className="block self-center border rounded-md m-auto"
                ></input>
              </th>
              <th className="px-4 py-2 border text-center">
                Time
                <input
                  value={this.filterTime}
                  onChange={this.filterTimeChange}
                  className="block self-center border rounded-md m-auto"
                ></input>
              </th>
              <th className="px-4 py-2 border text-center">
                ID
                <input
                  value={this.filterID}
                  onChange={this.filterIDChange}
                  className="block self-center border rounded-md m-auto"
                ></input>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map((transaction) => {
              return (
                <tr className = "border"key={transaction.id}>
                  <td className="border px-4 py-2 text-center">
                    {transaction.destinationUser}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {"$" + transaction.amount.toString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.date.toString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.time}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.id.toString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTransactionTable;
