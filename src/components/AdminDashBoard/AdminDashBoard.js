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
                {transactions.map((transaction) =>
                    <div key={transaction.id}>
                    {transaction.date} </div>
      )}
            </div>
          );
    }
}
 
export default AdminDashBoard;