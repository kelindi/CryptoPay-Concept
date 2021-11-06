import React, { Component } from "react";
 
class PopUp extends Component {
    handleClick = () => {
     this.props.toggle();
    };

    render() {
        return (
            <div className="bg-white rounded md:w-1/3 w-1/2 border shadow-lg relative">
                <div className="rounded-t bg-teal-500">
                    <div class="relative py-3 px-2 flex">
                        <span class="font-semibold text-white md:text-base text-sm">Send Money</span>
                        <span className="close" onClick={this.handleClick}>X</span> 
                        {/* mkae the x into a button, not span */}
                    </div>
                </div>
                <div class="bg-gray-200 md:text-base text-sm border-b p-2 h-24">
                    <p>Popup Messages</p>
                </div>
            </div>
        );
    }
}
 
export default PopUp;