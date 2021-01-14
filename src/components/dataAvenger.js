import React, { Component } from "react";

export default class DataArea extends Component {
  state = {
    employees: [],
    allEmployees: [],
    isLoading: true,
  };
  headings = ["name..."];

  componentDidMount() {
    fetch("/avengers.json")
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({
          employees: response,
          allEmployees: response,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePositionChange = (event) => {
    const power = event.target.value;
    if (power === "All") {
      this.setState({ employees: this.state.allEmployees });
    } else {
      this.setState({
        employees: this.state.allEmployees.filter(function (employee) {
          if (employee.power === power) {
            return true;
          }
          return false;
        }),
      });
    }
  };

  sortYearJoined = (event) => {
    const begin = event.target.value;
    if (begin === "long") {
      this.setState({
        employees: this.state.employees.sort(function (a, b) {
          var dateA = new Date(a.begin).getTime();
          var dateB = new Date(b.begin).getTime();
          return dateA > dateB ? 1 : -1;
        }),
      });
    } else if (begin === "short") {
      this.setState({
        employees: this.state.employees.sort(function (a, b) {
          var dateA = new Date(a.begin).getTime();
          var dateB = new Date(b.begin).getTime();
          return dateA < dateB ? 1 : -1;
        }),
      });
    }
  };

  render() {
    if (this.state.isLoading === true) {
      return <div>Loading...</div>;
    }
    return (
      <div>

        <div>
          <label className="filterSort" htmlFor="power">Filter By Power Unit:&ensp;</label>
          <select onChange={this.handlePositionChange} id="power">
            <option value="All">All</option>
            <option value="Energy">Energy</option>
            <option value="Fly">Fly</option>
            <option value="Senses">Senses</option>
            <option value="Size">Size</option>
            <option value="Strength">Strength</option>
            <option value="Weapons">Weapons</option>
          </select>
        </div>

        <div>
          <label className="filterSort" htmlFor="begin">Sort By Year Joined:&ensp;</label>
          <select onChange={this.sortYearJoined}>
            <option value="default">Default</option>
            <option value="long">Longest Tenure</option>
            <option value="short">Shortest Tenure</option>
          </select>
        </div>



        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Power Unit</th>
              <th>Year Joined</th>
              <th>Email</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(function (employee) {
              return (
                <tr key={employee.id}>
                  <td>
                    <img alt="pic" src={employee.pic}></img>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.power}</td>
                  <td>{employee.begin}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}