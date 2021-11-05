import React, { Component } from 'react';
import Transaction from '../../classes/Transaction';


class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOrigin: '',
            filterDestination: '',
            filterAmount:'',
            filterDate:'',
            filterTime:'',
            filterID:'',
            transactions: this.props.backend.transactions,
            masterTransactions:this.props.backend.transactions
        }
        this.filterOriginChange = this.filterOriginChange.bind(this)
        this.filterDestinationChange = this.filterDestinationChange.bind(this)
        this.filterAmountChange = this.filterAmountChange.bind(this)
        this.filterDateChange = this.filterAmountChange.bind(this)
        this.filterTimeChange = this.filterAmountChange.bind(this)
        this.filterIDChange = this.filterIDChange.bind(this)
    }

    filterOriginChange(event){
        this.setState({filterOrigin: event.target.value}, () => {
            const filteredTransactions = this.state.masterTransactions.filter(transaction => transaction.originUser.userName.toString().includes(this.state.filterOrigin))
            this.setState({transactions:filteredTransactions})
        })
    }
    filterDestinationChange(event){
        this.setState({filterDestination: event.target.value})
    }
    filterAmountChange(event){
        this.setState({filterAmount: event.target.value})
    }
    filterDateChange(event){
        this.setState({filterDate: event.target.value})
    }
    filterTimeChange(event){
        this.setState({filterTime: event.target.value})
    }
    filterIDChange(event){
        this.setState({filterID: event.target.value})
    }
    
    

    render() {
        
        
        
        return (
            <div className="font-sans">
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