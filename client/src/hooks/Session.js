import React from "react";
import { Query } from "@apollo/client/react/components";
import { ACTIVE_USER } from "../graphql/query";

const SessionHook = (Component) => (props) =>
  (
    <Query query={ACTIVE_USER}>
      {({ data, loading, refetch }) => {
        if (loading) return <div className="loading">loading...</div>;
        return <Component refetch={refetch} session={data}>{props}</Component>;
      }}
    </Query>
  );

export default SessionHook;
