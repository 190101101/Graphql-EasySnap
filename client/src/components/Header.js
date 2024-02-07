import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const LinksWithLogin = ({session}) => {
  return (
    <Fragment>
      <NavLink to="/profile">@{session.activeUser.username}</NavLink>
      <Logout/>
    </Fragment>
  );
};

const LinksWithUnLogin = () => {
  return (
    <Fragment>
      <NavLink to="/login">login</NavLink>
      <NavLink to="/join">join</NavLink>
    </Fragment>
  );
};

const Header = ({ session }) => {
  return (
    <div className="header">
      <div className="logo">
        <h2 className="logo__title">easysnap</h2>
      </div>

      <div className="header_menu">
        <NavLink to="/" exact className="active">
          snaps
        </NavLink>

        {session && session.activeUser ? (
          <LinksWithLogin session={session} />
        ) : (
          <LinksWithUnLogin />
        )}
      </div>
    </div>
  );
};

export default Header;
