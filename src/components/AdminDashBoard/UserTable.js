import React, { Component } from "react";
import { uuid } from "uuidv4";
import User from "../../classes/User";

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFirstName: "",
      filterLastName: "",
      filterUserName: "",
      filterWalletAddress: "",
      newFirstName: "",
      newLastName: "",
      newUserName: "",
      noFirstName: false,
      noLastName: false,
      noUserName: false,
      //retreive all the transactions from the backend
      users: this.props.users,
      masterUsers: this.props.users,
      showDeleteConfirm: false,
      userToDelete: null
    };
    this.filterFirstNameChange = this.filterFirstNameChange.bind(this);
    this.filterLastNameChange = this.filterLastNameChange.bind(this);
    this.filterUserNameChange = this.filterUserNameChange.bind(this);
    this.filterWalletAddressChange = this.filterWalletAddressChange.bind(this);
    this.filter = this.filter.bind(this);
    this.editMode = this.editMode.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.newFirstNameChange = this.newFirstNameChange.bind(this);
    this.newLastNameChange = this.newLastNameChange.bind(this);
    this.newUserNameChange = this.newUserNameChange.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.showDeleteUser = this.showDeleteUser.bind(this);
  }
  filter() {
    const filteredUsers = this.state.masterUsers.filter(
      (u) =>
        (u.firstName
          .toString()
          .includes(this.state.filterFirstName.toString()) ||
          this.state.filterFirstName === "") &&
        (u.lastName.toString().includes(this.state.filterLastName.toString()) ||
          this.state.filterLastName === "") &&
        (u.userName.toString().includes(this.state.filterUserName.toString()) ||
          this.state.filterUserName === "") &&
        (u.walletAddress
          .toString()
          .includes(this.state.filterWalletAddress.toString()) ||
          this.state.filterWalletAddress === "")
    );
    this.setState({ users: filteredUsers });
  }

  filterFirstNameChange(event) {
    this.setState({ filterFirstName: event.target.value }, () => {
      this.filter();
    });
  }

  filterLastNameChange(event) {
    console.log(event);
    this.setState({ filterLastName: event.target.value }, () => {
      this.filter();
    });
  }
  filterUserNameChange(event) {
    this.setState({ filterUserName: event.target.value }, () => {
      this.filter();
    });
  }
  filterWalletAddressChange(event) {
    this.setState({ filterWalletAddress: event.target.value }, () => {
      this.filter();
    });
  }

  editMode(user, event) {
    // hide edit button
    event.target.classList.add("hidden");

    //make all the cells we want to edit editable
    let divs = document.querySelectorAll("." + user.userName.toString());
    divs.forEach((div) => {
      div.setAttribute("contenteditable", "true");
      div.classList.add("border", "border-black-500", "rounded-md", "mx-2");
    });

    //show the save button
    document
      .querySelector("." + user.userName.toString() + "savebutton")
      .classList.remove("hidden");
  }

  saveEdit(user, event) {
    //hide save button
    event.target.classList.add("hidden");

    //make all the editable cells uneditable
    let divs = document.querySelectorAll("." + user.userName.toString());
    divs.forEach((div) => {
      div.setAttribute("contenteditable", "false");
      div.classList.remove("border", "border-black-500", "rounded-md", "mx-2");
    });

    //show edit button
    document
      .querySelector("." + user.userName.toString() + "editbutton")
      .classList.remove("hidden");

    //call server and update user information
    user.firstName = divs[0].innerHTML;
    user.lastName = divs[1].innerHTML;
    user.userName = divs[2].innerHTML;
  }
  newFirstNameChange(event) {
    this.setState({ newFirstName: event.target.value });
  }
  newLastNameChange(event) {
    this.setState({ newLastName: event.target.value });
  }
  newUserNameChange(event) {
    this.setState({ newUserName: event.target.value });
  }

  addNewUser() {
    if (
      this.state.newFirstName !== "" &&
      this.state.newLastName !== "" &&
      this.state.newUserName !== ""
    ) {
      this.state.masterUsers.push(
        new User(
          this.state.newFirstName,
          this.state.newLastName,
          this.state.newUserName,
          0,
          uuid()
        )
      );
      this.setState({ users: this.state.masterUsers });
      this.setState({ newFirstName: "" });
      this.setState({ newLastName: "" });
      this.setState({ newUserName: "" });
      this.setState({ noFirstName: false });
      this.setState({ noLastName: false });
      this.setState({ noUserName: false });
    } else {
      if (this.state.newFirstName === "") {
        this.setState({ noFirstName: true });
      } else {
        this.setState({ noFirstName: false });
      }
      if (this.state.newLastName === "") {
        this.setState({ noLastName: true });
      } else {
        this.setState({ noLastName: false });
      }
      if (this.state.newUserName === "") {
        this.setState({ noUserName: true });
      } else {
        this.setState({ noUserName: false });
      }
    }
  }

  deleteUser() {
    const newUserArray = this.state.masterUsers.filter(
      (user) => user !== this.state.userToDelete
    );
    this.setState({ masterUsers: newUserArray });
    this.setState({ users: newUserArray });
    this.setState({showDeleteConfirm: false})
  }


  showDeleteUser(user) {
    console.log(user)
    this.setState({userToDelete: user},this.setState({ showDeleteConfirm: true }))
    
  }

  render() {
    return (
      <div className="font-sans">
        {this.state.showDeleteConfirm ? (
          <div className="absolute z-100 bg-black shadow-lg border w-1/6 mx-auto left-0 right-0 top-1/4 rounded-lg bg-opacity-90 text-white">
            <div className="px-4 backdrop-filter my-4">
              <div className="text-center backdrop-filter">
                Are you sure you want to delete <b className = "text-red-500">{this.state.userToDelete.userName}</b> This action cannot be
                undone!
              </div>
              <div className="text-center mt-5 text-black">
                <button
                  className="inline bg-red-500 rounded-xl px-2 py-1 mx-1"
                  onClick={() => this.setState({ showDeleteConfirm: false })}
                >
                  CANCEL
                </button>
                <button onClick={this.deleteUser} className="inline bg-green-500 rounded-xl px-2 py-1 mx-1">
                  DELETE USER
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="border text-center text-2xl">USERS</div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-1 py-2 border text-center">Profile Picture</th>
              <th className="px-1 py-2 border text-center">
                First Name
                <input
                  value={this.state.filterFirstName}
                  onChange={this.filterFirstNameChange}
                  className="block m-auto border rounded-md"
                ></input>
              </th>
              <th className="px-1 py-2 border text-center">
                Last Name
                <input
                  value={this.state.filterLastName}
                  onChange={this.filterLastNameChange}
                  className="block m-auto border rounded-md"
                ></input>
              </th>
              <th className="px-1 py-2 border text-center">
                Username
                <input
                  value={this.state.filterUserName}
                  onChange={this.filterUserNameChange}
                  className="block m-auto border rounded-md"
                ></input>
              </th>
              <th className="px-1 py-2 border text-center">
                Wallet Address
                <input
                  value={this.state.filterWalletAddress}
                  onChange={this.filterWalletAddressChange}
                  className="block m-auto border rounded-md"
                ></input>
              </th>
              <th className="px-1 py-2 border text-center"> Account Balance</th>
              <th className="px-1 py-2 border text-center">Edit</th>
              <th className="px-1 py-2 border text-center">Delete User</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr key={user.userName}>
                  <td className="px-0.5 py-1 border text-center">
                    <img
                      className="m-auto w-10 h-10 rounded-full flex items-center justify-center"
                      src={user.profilePicture}
                    />
                  </td>
                  <td className="px-0.5 py-1 border text-center">
                    <div className={user.userName.toString()}>
                      {user.firstName.toString()}
                    </div>
                  </td>
                  <td className="px-0.5 py-1 border text-center">
                    <div className={user.userName.toString()}>
                      {user.lastName.toString()}
                    </div>
                  </td>
                  <td className="px-0.5 py-1 border text-center">
                    <div className={user.userName.toString()}>
                      {user.userName.toString()}
                    </div>
                  </td>
                  <td className="px-0.5 py-1 border text-center">
                    {user.walletAddress.toString()}
                  </td>
                  <td className="px-0.5 py-1 border text-center">
                    {"$" + user.currentAccountBalance.toString()}
                  </td>
                  <td className="px-0.5 py-1 border text-center mx-2">
                    <button
                      className={
                        user.userName.toString() +
                        "editbutton" +
                        " bg-gray-400 border  rounded-2xl px-2 py-1"
                      }
                      onClick={(event) => this.editMode(user, event)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      onClick={(event) => this.saveEdit(user, event)}
                      className={
                        user.userName.toString() +
                        "savebutton" +
                        " hidden bg-green-500 border border-black rounded-2xl px-2 py-1"
                      }
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </td>
                  <td className="px-0.5 py-1 border text-center mx-2">
                    <button
                      className={" bg-red-500 border  rounded-2xl px-2 py-1"}
                      onClick={() => this.showDeleteUser(user)}
                    >
                      {" "}
                      Delete User
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex">
          <div className="my-2 mx-auto">
            <input
              className={
                (this.state.noFirstName
                  ? "border-red-500"
                  : "boder-black-700") + " border rounded-md mx-1 px-4"
              }
              placeholder="First Name"
              value={this.state.newFirstName}
              onChange={this.newFirstNameChange}
            ></input>
            <input
              className={
                (this.state.noLastName ? "border-red-500" : "boder-black-700") +
                " border rounded-md mx-1 px-4"
              }
              placeholder="Last Name"
              value={this.state.newLastName}
              onChange={this.newLastNameChange}
            ></input>
            <input
              className={
                (this.state.noUserName ? "border-red-500" : "boder-black-700") +
                " border rounded-md mx-1 px-4"
              }
              placeholder="Username"
              value={this.state.newUserName}
              onChange={this.newUserNameChange}
            ></input>
            <button
              className="bg-green-500 border rounded-2xl px-2 py-1"
              onClick={() => this.addNewUser()}
            >
              Add New User
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserTable;
