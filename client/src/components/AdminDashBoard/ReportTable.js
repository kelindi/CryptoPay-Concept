import React, {Component} from "react";

class ReportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: this.props.reports,
      resolvedReports: this.props.resolvedReports,
      showReportPopup: false,
      reportToResolve: null,
      comment: "",
    };
    this.resolveReport = this.resolveReport.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.showResolveReport = this.showResolveReport.bind(this);
  }
  updateComment(event) {
    this.setState(
      { comment: event.target.value },
      console.log(this.state.comment)
    );
  }
  showResolveReport(report) {
    this.setState(
      { showReportPopup: true },
      this.setState({ reportToResolve: report })
    );
  }
  resolveReport() {
    const newReportsArray = this.state.reports.filter(
      (r) => r !== this.state.reportToResolve
    );
    const newResolvedReports = this.state.resolvedReports;
    this.state.reportToResolve.resolvedComment = this.state.comment.toString();
    newResolvedReports.push(this.state.reportToResolve);
    this.setState(
      { resolvedReports: newResolvedReports }
    );
    this.setState({ reports: newReportsArray });
    this.setState({ showReportPopup: false });
  }

  render() {
    return (
      <div className="font-mono">
        {this.state.showReportPopup ? (
          <div className="absolute z-100 bg-black shadow-lg border w-2/6 h-auto mx-auto left-0 right-0 top-1/4 rounded-lg bg-opacity-90 text-white">
            <div className="relative px-4 backdrop-filter my-4">
              <div className="text-center backdrop-filter ">
                <label className="block">Comments:</label>
                <textarea
                  type="text"
                  className="text-black px-2 rounded-md w-96 h-32"
                  value={this.state.comment}
                  onChange={(e) => this.updateComment(e)}
                ></textarea>
              </div>
              <div className="text-center mt-5 text-black">
                <button
                  className="inline bg-red-500 rounded-xl px-2 py-1 mx-1"
                  onClick={() => this.setState({ showReportPopup: false },this.setState({comment:''}))}
                >
                  CANCEL
                </button>
                <button
                  onClick={() => this.resolveReport()}
                  className="inline bg-green-500 rounded-xl px-2 py-1 mx-1"
                >
                  Resolve
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="border text-center text-3xl py-4">REPORTS</div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">Submitter</th>
              <th className="px-4 py-2 border text-center">Destination</th>
              <th className="px-4 py-2 border text-center">Reason</th>
              <th className="px-4 py-2 border text-center">Date</th>
              <th className="px-4 py-2 border text-center">Time</th>
              <th className="px-4 py-2 border text-center">ID</th>
              <th className="px-4 py-2 border text-center">Resolve</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reports.map((report) => {
              return (
                <tr key={report.id.toString()}>
                  <td className="px-4 py-2 border text-center">
                    {report.submitter.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.reportedUser.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.reason.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.date.slice(0, 10).toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.time.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.id.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className={" bg-green-500 border  rounded-2xl px-2 py-1"}
                      onClick={() => this.showResolveReport(report)}
                    >
                      Mark As Resolved
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="border text-center text-3xl py-4">RESOLVED REPORTS</div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">Submitter</th>
              <th className="px-4 py-2 border text-center">Destination</th>
              <th className="px-4 py-2 border text-center">Reason</th>
              <th className="px-4 py-2 border text-center">Date</th>
              <th className="px-4 py-2 border text-center">Time</th>
              <th className="px-4 py-2 border text-center">ID</th>
              <th className="px-4 py-2 border text-center">Comment</th>
            </tr>
          </thead>
          <tbody>
          {this.state.resolvedReports.map((report) => {
              return (
                <tr key={report.id.toString()+"resolved"}>
                  <td className="px-4 py-2 border text-center">
                    {report.submitter.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.reportedUser.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.reason.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.date.slice(0, 10).toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.time.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.id.toString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.resolvedComment}
                  </td>
                </tr>
              );
            })}
            
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReportTable;
