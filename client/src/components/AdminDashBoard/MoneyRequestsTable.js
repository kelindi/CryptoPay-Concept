import React, { Component } from "react";
class MoneyRequestsTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        moneyRequests: this.props.moneyRequests,
        showDeletePopup: false,
        requestToDelete: null
      };
    }

    setShowDeletePopup = () =>{
        this.setState({showDeletePopup:true},console.log(this.state.showDeletePopup))
    }


    deleteRequest = () => {
        let newMoneyRequests = this.state.moneyRequests.filter((request) => (request !== this.state.requestToDelete))
        this.setState({moneyRequests:newMoneyRequests},this.setState({showDeletePopup: false}))
    }
  
    render() {
      return (
        <div className="font-mono">
          {this.state.showDeletePopup ? (
            <div className="absolute z-100 bg-black shadow-lg border w-2/6 h-auto mx-auto left-0 right-0 top-1/4 rounded-lg bg-opacity-90 text-white">
              <div className="relative px-4 backdrop-filter my-4">
              <div className="text-center">
                Are you sure you want to delete{" "}
                <b className="text-red-500">
                  {this.state.requestToDelete.id}
                </b>{" "}
                This action cannot be undone!
              </div>
                <div className="text-center mt-5 text-black">
                  <button
                    className="inline bg-red-500 rounded-xl px-2 py-1 mx-1 transform hover:scale-110 transition duration-500 ease-in-out"
                    onClick={() => this.setState({ showDeletePopup: false })}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => this.deleteRequest()}
                    className="inline bg-green-500 rounded-xl px-2 py-1 mx-1 transform hover:scale-110 transition duration-500 ease-in-out"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="border text-center text-3xl py-4">MONEY REQUESTS</div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">Requestor</th>
                <th className="px-4 py-2 border text-center">Destination</th>
                <th className="px-4 py-2 border text-center">Amount</th>
                <th className="px-4 py-2 border text-center">Date</th>
                <th className="px-4 py-2 border text-center">ID</th>
                <th className="px-4 py-2 border text-center">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.moneyRequests.map((request) => {
                return (
                  <tr key={request.id.toString()}>
                    <td className="px-4 py-2 border text-center">
                      {request.originUser.userName.toString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {request.destinationUser.userName.toString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {request.amount.toString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {request.date.toString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {request.id.toString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className={" bg-red-500 border  rounded-2xl px-2 py-1 transform hover:scale-110 transition duration-500 ease-in-out"}
                        onClick={() => this.setState({requestToDelete:request},this.setShowDeletePopup)}
                      >
                        DELETE
                      </button>
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
  
  export default MoneyRequestsTable;