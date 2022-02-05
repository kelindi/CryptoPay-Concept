import React, { Component } from "react";
import { uuid } from "uuidv4";
import Loading from "../../Loading";

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
      // transactions: this.props.global.transactions,
      // masterTransactions: this.props.global.transactions,
      transactions: this.props.user.transactions,
      waitingforTransactions: false,
    };
    this.filterDestinationChange = this.filterDestinationChange.bind(this);
    this.filterAmountChange = this.filterAmountChange.bind(this);
    this.filterDateChange = this.filterDateChange.bind(this);
    this.filterTimeChange = this.filterTimeChange.bind(this);
    this.filterIDChange = this.filterIDChange.bind(this);
    this.filter = this.filter.bind(this);

  }
  componentDidMount(){
    if (this.props.user.transactions === null) {
      this.setState({transactions: [],waitingforTransactions: true})
    }
  }

  componentDidUpdate()
   {
    if(this.state.waitingforTransactions === true && this.props.user.transactions !== null){
      this.setState({transactions: this.props.user.transactions,waitingforTransactions: false})
    }
  }

  filter() {
    if (this.props.user.transactions === null) {
      console.log("waiting for transactions");
      return
    }
    const filteredTransactions = this.props.user.transactions.filter(
      (t) =>
        t.originUser ===
          this.props.user.userName &&
        (t.destinationUser
          .toString()
          .includes(this.state.filterDestination.toString()) ||
          this.state.filterDestination == "") &&
        (t.amount.toString() == this.state.filterAmount.toString() ||
          this.state.filterAmount === "") &&
        (t.date.slice(0, 10).toString().includes(this.state.filterDate.toString()) ||
          this.state.filterDate === "") &&
        (t.time == this.state.filterTime.toString() ||
          this.state.filterTime === "") &&
        (t.id.toString().includes(this.state.filterID.toString()) ||
          this.state.filterID === "")
    );
    this.setState({ transactions: filteredTransactions }
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
      <div className="bg-gray-900 text-custom-100 font-sans font-light rounded-xl transactionTable flex flex-col ml-4 mr-4 px-2 pb-2 shadow-l">
        <div className="text-center text-3xl py-4 flex flex-none flex-col">TRANSACTIONS</div>
        {this.props.user.transactions === null ? (
          <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
          <table className="table-auto w-full border-gray-50">
            <thead className = "sticky bg-gray-900 top-0">
              <tr>
                <th className="px-4 py-2 text-center sticky top-0">
                  Destination
                  <input
                    className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                  ></input>
                </th>
                <th className="px-2 py-2 text-center sticky top-0">
                  Amount
                  <input
                    className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                  ></input>
                </th>
                <th className="px-4 py-2 text-center sticky top-0">
                  Date
                  <input
                    className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                  ></input>
                </th>
                <th className="px-4 py-2 text-center sticky top-0">
                  Time
                  <input
                    className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                  ></input>
                </th>
                <th className="px-4 py-2 text-center sticky top-0">
                  ID
                  <input
                    className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                  ></input>
                </th>
              </tr>
            </thead>
            <tbody className="animate-pulse">
              { 
              Array.from({ length: 30 }).map((transaction) => {
                return (
                  <tr className="text-gray-800" key={uuid()}>
                    <td className="px-4 py-1 m-2 text-center">
                      <span className="bg-gray-800 text-gray-800 rounded-md">username</span>
                    </td>
                    <td className=" px-2 py-1 text-center ">
                      <span className="bg-gray-800 text-gray-800 rounded-md">0.0000001</span>
                    </td>
                    <td className=" px-4 py-1 text-center ">
                    <span className="bg-gray-800 text-gray-800 rounded-md">10-10-2020</span>
                    </td>
                    <td className=" px-4 py-1 text-center ">
                    <span className="bg-gray-800 text-gray-800 rounded-md">18:00</span>
                    </td>
                    <td className=" px-4 py-1 text-center ">
                    <span className="bg-gray-800 text-gray-800 rounded-md">61b13b58a7e1efa1c1f9835b</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        ):(
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
        <table className="table-auto w-full border-gray-50">
          <thead className = "sticky bg-gray-900 top-0">
            <tr>
              <th className="px-4 py-2 text-center sticky top-0">
                Destination
                <input
                  value={this.filterDestination}
                  onChange={this.filterDestinationChange}
                  className="block self-center rounded-md f m-auto bg-gray-800 outline-none"
                ></input>
              </th>
              <th className="px-2 py-2 text-center sticky top-0">
                Amount
                <input
                  value={this.filterAmount}
                  onChange={this.filterAmountChange}
                  className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                ></input>
              </th>
              <th className="px-4 py-2 text-center sticky top-0">
                Date
                <input
                  value={this.filterDate}
                  onChange={this.filterDateChange}
                  className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                ></input>
              </th>
              <th className="px-4 py-2 text-center sticky top-0">
                Time
                <input
                  value={this.filterTime}
                  onChange={this.filterTimeChange}
                  className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                ></input>
              </th>
              <th className="px-4 py-2 text-center sticky top-0">
                ID
                <input
                  value={this.filterID}
                  onChange={this.filterIDChange}
                  className="block self-center rounded-md m-auto bg-gray-800 outline-none"
                ></input>
              </th>
            </tr>
          </thead>
          <tbody>
            { 
            this.state.transactions.reverse().map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="px-4 py-1 m-2 text-center">
                    {transaction.destinationUser}
                  </td>
                  <td className=" px-2 py-1 text-center">
                    {transaction.amount.toString()}
                  </td>
                  <td className=" px-4 py-1 text-center">
                    {transaction.date.slice(0, 10).toString()}
                  </td>
                  <td className=" px-4 py-1 text-center">
                    {transaction.time}
                  </td>
                  <td className=" px-4 py-1 text-center">
                    {transaction.id.toString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        )
          }
      </div>
    );
  }
}

export default UserTransactionTable;
