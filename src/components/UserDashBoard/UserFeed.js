import React, { Component } from 'react';

/*
TODO

note: please use camelCaseCase
Classes need to have CapitalNames
Have descriptive function names like createSomething
Comment complex code

1. Friend Requests (incoming)
2. Incoming requests
    display request and whether you want to accept or reject
3. Outgoing requests 
    display that the request is pending and if the person rejected the request also give the option to rescind the request
4. Transactions
    shows sender receiver money and date 11-03-2021 and time

5. Add search bar with filter options (for transactions)


*/


class UserFeed extends Component {
    constructor(props) {
        super(props);
    }
    
    

    render() {
        
        return (
            <div className = "relative rounded-lg h-4/5 bg-gray-300 opacity-75">
                
                <div className="float-left rounded-lg h-1/3 w-1/2 bg-color bg-blue-200">
                {/* div for incoming requests */}
                </div>
                <div className="float-right rounded-lg h-1/3 w-1/2 bg-color bg-blue-100">
                {/* div for outgoing requests */}
                </div>
                
                <div className="absolute bottom-0 rounded-lg h-2/3 w-full bg-color bg-blue-300 opacity-60">
                {/* div for rest of the feed */}
                
                </div>
            </div>
            
          );
    }
}
 
export default UserFeed;