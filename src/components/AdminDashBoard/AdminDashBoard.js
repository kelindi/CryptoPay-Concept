import React, { Component } from 'react';
import TransactionTable from './TransactionTable';

class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        
        return (
            <TransactionTable transactions = {this.props.backend.transactions}></TransactionTable>
          );
    
}
}
 
export default AdminDashBoard;