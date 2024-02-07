import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ACTIVE_USER } from "../graphql/query";

const Auth = ({ path, render: Component, condition, ...rest }) => {
  const {data: { activeUser }} = useQuery(ACTIVE_USER);

  return (
    <Route path={path} {...rest}
      render={(props) =>
        condition(activeUser) ? (<Redirect to="/" />) : (<Component {...props} />)
      }
    />
  );
};


export default Auth;
