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
                    <div key={transaction.id} className = 'w-full'>
                    
                        <div className = "inline w-1/7">{transaction.originUserName.userName.toString()}</div>
                        <div className = "inline w-1/7">{transaction.destinationUserName.userName.toString()}</div>
                        <div className = "inline w-1/7">{transaction.amount.toString()}</div>
                        <div className = "inline w-1/7">{transaction.date.toString()}</div>
                        <div className = "inline w-1/7">{transaction.time.toString()}</div>
                        <div className = "inline w-1/7">{transaction.id.toString()}</div>
                    
                    
                    </div>
                    
      )}
            </div>
          );
    }
}
 
export default AdminDashBoard;