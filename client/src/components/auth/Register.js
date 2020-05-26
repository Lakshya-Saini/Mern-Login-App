import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row mx-0">
        <div className="col-md-6 mx-auto px-0">
          <div className="card my-5">
            <div className="card-body">
              <h4 className="text-center pb-4">Register</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={classnames("form-control shadow-none", {
                      invalid: errors.name,
                    })}
                    placeholder="eg. John Doe"
                    onChange={this.handleChange}
                    value={this.state.name}
                    error={errors.name}
                  />
                  <span className="text-danger">{errors.name}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={classnames("form-control shadow-none", {
                      invalid: errors.email,
                    })}
                    placeholder="eg. johndoe@example.com"
                    onChange={this.handleChange}
                    value={this.state.email}
                    error={errors.email}
                  />
                  <span className="text-danger">{errors.email}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={classnames("form-control shadow-none", {
                      invalid: errors.password,
                    })}
                    placeholder="eg. ******"
                    onChange={this.handleChange}
                    value={this.state.password}
                    error={errors.password}
                  />
                  <span className="text-danger">{errors.password}</span>
                </div>
                <div className="form-group mb-0">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block shadow-none"
                  />
                </div>
              </form>
              <p className="mb-0 mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
