import React, { Component } from 'react';

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterFirstName: '',
            filterLastName: '',
            filterUserName:'',
            filterWalletAddress:'',
            //retreive all the transactions from the backend
            transactions: this.props.transactions,
            masterTransactions:this.props.transactions
        }
        
    }
    
    
    

    render() {
        
        
        
        return (
            <div className="font-sans">
                <div className = "border text-center text-2xl">TRANSACTIONS</div>
                <table className = "table-auto w-full">
                    <thead>
                        <tr>
                            <th className = "px-4 py-2 border text-center">Origin
                                <input value = {this.filterOrigin} onChange = {this.filterOriginChange} className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Destination
                                <input value = {this.filterDestination} onChange = {this.filterDestinationChange} className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Amount
                                <input value = {this.filterAmount} onChange = {this.filterAmountChange} className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Date
                                <input value = {this.filterDate} onChange = {this.filterDateChange} className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Time
                                <input value = {this.filterTime} onChange = {this.filterTimeChange} className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">ID
                                <input value = {this.filterID} onChange = {this.filterIDChange} className = "block self-center border rounded-md m-auto"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((transaction) =>{
                        return(
                        <tr key = {transaction.id}>
                            <td className = "px-4 py-2 border text-center">{transaction.originUser.userName.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.destinationUser.userName.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{'$' + transaction.amount.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.date.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.time.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.id.toString()}</td>
                        </tr>
                        )})}
                    </tbody>
                </table>    
            </div>
          );
    
}
}
 
export default UserTable;