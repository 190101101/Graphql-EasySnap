import React from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "@apollo/client";

const Logout = ({ history }) => {
  const onClick = (client, history) => {
    client.resetStore();
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <ApolloConsumer>
      {(client) => {
        return <a onClick={() => onClick(client, history)}>logout</a>;
      }}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
