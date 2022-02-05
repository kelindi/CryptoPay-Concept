import React from 'react';

class Loading extends React.Component {
    render() {
        return (
          <div>
            <div className="loading">
                  <div
                    className={
                      "h-14 flex items-center px-4 py-3 bg-gray-800 rounded-xl my-2 animate-pulse"
                    }
                  >
                    <div
                      className="h-10 w-10 rounded-full bg-gray-900"
                    ></div>
                    <p className="text-gray-900  text-sm mx-2 w-28">
                      <span className="font-bold block bg-gray-900 rounded-md">
                        <strong className="uppercase">
                          username{" "}
                        </strong>
                      </span>
                      <div>
                        <div className="font-light text-xs rounded-md">
                          <b className="bg-gray-900 text-gray-900 rounded-md">Sent:10-02-2020{" "}</b>
                        </div>
                      </div>
                    </p>
                    <div className="px-1 float-left font-light  text-gray-900 text-lg flex flex-row text-center w-16 h-full items-center">
                      <div
                        className="h-full bg-gray-900 w-5 mx-2 inline rounded-md"
                        size="24"
                      ></div>
                      <span className="rounded-md bg-gray-900">
                        0.00001
                      </span>
                    </div>
                    <div className="ml-auto text-xs">
                      
                    </div>
                  </div>
          </div>
          <div className="loading">
                  <div
                    className={
                      "h-14 flex items-center px-4 py-3 bg-gray-800 rounded-xl my-2 animate-pulse"
                      
                    }
                  >
                    <div
                      className="h-10 w-10 rounded-full bg-gray-900"
                    ></div>
                    <p className="text-gray-900  text-sm mx-2 w-28">
                      <span className="font-bold block bg-gray-900 rounded-md">
                        <strong className="uppercase">
                          username{" "}
                        </strong>
                      </span>
                      <div>
                        <div className="font-light text-xs rounded-md">
                          <b className="bg-gray-900 text-gray-900 rounded-md">Sent:10-02-2020{" "}</b>
                        </div>
                      </div>
                    </p>
                    <div className="px-1 float-left font-light  text-gray-900 text-lg flex flex-row text-center w-16 h-full items-center">
                      <div
                        className="h-full bg-gray-900 w-5 mx-2 inline rounded-md"
                        size="24"
                      ></div>
                      <span className="rounded-md bg-gray-900">
                        0.00001
                      </span>
                    </div>
                    <div className="ml-auto text-xs">
                      
                    </div>
                  </div>
          </div>
          </div>
        );
          
          
    }
    }

    export default Loading;
