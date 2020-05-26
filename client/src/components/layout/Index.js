import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="index-page">
      <div className="row mx-0">
        <div className="col-md-6 px-0 mx-auto my-5">
          <div className="card">
            <div className="card-body text-center">
              <i className="fab fa-react fa-3x pb-4 pr-4"></i>
              <i className="fab fa-node-js fa-3x pb-4"></i>
              <h5>MERN Login App</h5>
              <Link
                to="/register"
                className="btn btn-primary btn-block shadow-none mt-4"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary btn-block shadow-none"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
