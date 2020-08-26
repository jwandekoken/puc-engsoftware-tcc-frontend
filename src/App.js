import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ErrorModal from "./shared/components/ui-elements/ErrorModal";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <>
        <ErrorModal />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
