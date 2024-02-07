import React from "react";
import { useQuery } from "@apollo/client";
import TimeAgo from "react-timeago";
import { SNAPS } from "../../graphql/query";
import { NEW_SNAP } from "../../graphql/subscription";

const Snaps = () => {
  const { data, subscribeToMore, loading, error } = useQuery(SNAPS);

  subscribeToMore({
    document: NEW_SNAP,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newItem = subscriptionData.data.snap;

      if (!prev.snaps.find((snap) => snap.id === newItem.id)) {
        return {
          ...prev,
          snaps: [newItem, ...prev.snaps],
        };
      }else{
        return prev;
      }
    },
  });

  return (
    <>
      <div>
        {loading && <div className="loading">loading...</div>}
        {error && <div className="loading">error...</div>}

        <ul className="snaps">
          {data &&
            data.snaps.map((snap, index) => (
              <li key={index} className={snap.id < 0 ? "optimistic" : ""}>
                <div className="title">
                  <span className="username">@{snap.user.username} </span>
                  <span>{snap.text}</span>
                </div>
                <div className="date">
                  {snap.id < 0 ? (
                    "sending..."
                  ) : (
                    <TimeAgo date={snap.createdAt} />
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="counter">{data && data.snaps.length} snap(s)</div>
    </>
  );
};

export default Snaps;
