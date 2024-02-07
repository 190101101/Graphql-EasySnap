import React, { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { JOIN } from "../../graphql/subscription";

const JoinedUser = () => {
  const { data, loading } = useSubscription(JOIN);
  const [showUsername, setShowUsername] = useState(false);

  useEffect(() => {
    setShowUsername(true);
    const timeoutId = setTimeout(() => {
      setShowUsername(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <div className="joinedUs">
      {!loading && data && showUsername && (
        <div>
          <strong>@{data.user.username}</strong> is joined to us
        </div>
      )}
    </div>
  );
};

export default JoinedUser;
