import React, { Component } from 'react';
import Transaction from '../../classes/Transaction';


class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
    }
    
    

    render() {
        const {backend} = this.props
        const transactions = backend.transactions
        const moneyRequests = backend.moneyRequests
        
        
        return (
            <div className="font-sans">
                <table className = "table-auto w-full">
                    <thead>
                        <tr>
                            <th className = "px-4 py-2 border text-center">Origin
                                <input className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Destination
                                <input className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Amount
                                <input className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Date
                                <input className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">Time
                                <input className = "border rounded-md"></input>
                            </th>
                            <th className = "px-4 py-2 border text-center">ID
                                <input className = "block self-center border rounded-md m-auto"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) =>{
                        return(
                        <tr key = {transaction.id}>
                            <td className = "px-4 py-2 border text-center">{transaction.originUserName.userName.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.destinationUserName.userName.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.amount.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.date.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.time.toString()}</td>
                            <td className = "px-4 py-2 border text-center">{transaction.id.toString()}</td>
                        </tr>
                        )
                        })}
                    </tbody>
                </table>    
                       
      
                    
                    
            </div>
          );
    
}
}
 
export default AdminDashBoard;