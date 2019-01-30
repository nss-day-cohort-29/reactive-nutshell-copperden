import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Nutshell.css";

class Nutshell extends Component {

  isAuthenticated = () => sessionStorage.getItem("username") !== null

  showNav = () => {
    if (this.isAuthenticated()) {
      return <NavBar />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.showNav()}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Nutshell;
