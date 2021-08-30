import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="nav">
      <li>
        <Link to="/" className="home">
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            className="home colorBlue"
          />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="profile">
          <FontAwesomeIcon icon={faUser} size="2x" className="user colorBlue" />
          {userObj.displayName && `${userObj.displayName}'s`} Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
