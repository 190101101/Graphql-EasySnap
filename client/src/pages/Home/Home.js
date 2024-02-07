import React from "react";
import Form from "./Form";
import Snaps from "./Snaps";
import JoinedUser from "./JoinedUser";

const Home = ({ session }) => {
  return (
    <>
      <div className="description">
        <p className="sub_header__desc">
          simple snap app with <span>react</span>.
        </p>
      </div>
      <Form session={session} />
      <Snaps />
      <JoinedUser />
    </>
  );
};

export default Home;
