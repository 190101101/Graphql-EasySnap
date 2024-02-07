import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Session from "./hooks/Session";
import Auth from "./hooks/Auth";

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Join from "./pages/Join";
import Login from "./pages/Login";


const Rootes = ({ refetch, session }) => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header session={session} />
        <Switch>
          <Route path="/" exact render={() => <Home session={session} />} />
          <Auth
            path="/login"
            render={() => <Login refetch={refetch} />}
            condition={(activeUser) => activeUser != null}
          />

          <Auth
            path="/join"
            render={() => <Join refetch={refetch} />}
            condition={(activeUser) => activeUser != null}
          />

          <Auth
            path="/profile"
            render={() => <Profile session={session} />}
            condition={(activeUser) => activeUser == null}
          />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

const SessionHook = Session(Rootes);

const App = () => {
  return (
    <div id="app">
      <div className="container">
        <SessionHook />
      </div>
    </div>
  );
};

export default App;
