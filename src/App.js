import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { autoLogInUser } from "./shared/redux/actions/auth";
import ErrorModal from "./shared/components/ui-elements/ErrorModal";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App({ autoLogInUser }) {
  useEffect(() => {
    autoLogInUser();
  }, [autoLogInUser]);

  return (
    <Router>
      <>
        <ErrorModal />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </>
    </Router>
  );
}

App.propTypes = {
  autoLogInUser: PropTypes.func.isRequired,
};

export default connect(null, {
  autoLogInUser,
})(App);
