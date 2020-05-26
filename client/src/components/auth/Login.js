import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

    const { email, password } = this.state;

    const userData = {
      email,
      password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row mx-0">
        <div className="col-md-6 px-0 mx-auto my-5">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center pb-4">Login</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={classnames("form-control shadow-none", {
                      invalid: errors.email || errors.emailNotFound,
                    })}
                    placeholder="eg. johndoe@example.com"
                    onChange={this.handleChange}
                    value={this.state.email}
                    error={errors.email}
                  />
                  <span className="text-danger">
                    {errors.email}
                    {errors.emailNotFound}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={classnames("form-control shadow-none", {
                      invalid: errors.password || errors.passwordIncorrect,
                    })}
                    placeholder="eg. ******"
                    onChange={this.handleChange}
                    value={this.state.password}
                    error={errors.password}
                  />
                  <span className="text-danger">
                    {errors.password}
                    {errors.passwordIncorrect}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block shadow-none"
                  />
                </div>
              </form>
              <p className="mb-0">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
