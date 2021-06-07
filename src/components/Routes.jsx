import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartPage from "./StartPage";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/"}`}
            component={StartPage}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
