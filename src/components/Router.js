import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedin, userObj }) => {
  return (
    <Router>
      {isLoggedin && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedin ? (
          <>
            <div className="router_container">
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </div>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth></Auth>
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
