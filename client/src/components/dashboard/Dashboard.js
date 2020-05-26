import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="row mx-0 py-5">
        <div className="col-md-12 px-0">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <p className="text-secondary">
              You are logged into a full-stack MERN App
            </p>
          </h4>
          <button
            onClick={this.handleLogout}
            className="btn btn-primary shadow-none"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
