import React, { Component } from 'react';

class TransactionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOrigin: '',
            filterDestination: '',
            filterAmount:'',
            filterDate:'',
            filterTime:'',
            filterID:'',
            //retreive all the transactions from the backend
            transactions: this.props.transactions,
            masterTransactions:this.props.transactions
        }
        this.filterOriginChange = this.filterOriginChange.bind(this)
        this.filterDestinationChange = this.filterDestinationChange.bind(this)
        this.filterAmountChange = this.filterAmountChange.bind(this)
        this.filterDateChange = this.filterDateChange.bind(this)
        this.filterTimeChange = this.filterTimeChange.bind(this)
        this.filterIDChange = this.filterIDChange.bind(this)
        this.filter = this.filter.bind(this)
    }
    filter(){
        const filteredTransactions = this.state.masterTransactions.filter(t=>
            (t.originUser.userName.toString().includes(this.state.filterOrigin.toString()) || this.state.filterOrigin.toString()== '')
            && 
            (t.destinationUser.userName.toString().includes(this.state.filterDestination.toString())|| this.state.filterDestination == '')
            && 
            (t.amount.toString() == this.state.filterAmount.toString() || this.state.filterAmount == '')
            && 
            (t.date.toString().includes(this.state.filterDate.toString())|| this.state.filterDate == '')
            &&
            (t.time.toString() == this.state.filterTime.toString()|| this.state.filterTime == '')
            &&
            (t.id.toString().includes(this.state.filterID.toString()) || this.state.filterID == '')
        )
        this.setState({transactions:filteredTransactions}, () => console.log(this.state.transactions))
    }

    filterOriginChange(event){
        this.setState({filterOrigin: event.target.value}, () => {
            this.filter()
        })
    }
    filterDestinationChange(event){
        this.setState({filterDestination: event.target.value}, () => {
            this.filter()
        })
    }
    filterAmountChange(event){
        this.setState({filterAmount: event.target.value}, () => {
            this.filter()
        })
    }
    filterDateChange(event){
        this.setState({filterDate: event.target.value.toString()}, () => {
            this.filter()
        })
    }
    filterTimeChange(event){
        this.setState({filterTime: event.target.value}, () => {
            this.filter()
        })
    }
    filterIDChange(event){
        this.setState({filterID: event.target.value}, () => {
            this.filter()
        })
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
 
export default TransactionTable;