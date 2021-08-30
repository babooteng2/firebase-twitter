import { authService, COLLECTION_NAME, dbService } from "fbase";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setDisplayName] = useState(
    userObj.displayName ? userObj.displayName : ""
  );
  const history = useHistory();
  const onLogOut = () => {
    history.push("/");
    authService.signOut();
  };

  const getMyTweets = useCallback(async () => {
    const tweetArr = await dbService
      .collection(COLLECTION_NAME)
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    tweetArr.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setTweets(tweetArr);
  }, [userObj]);

  useEffect(() => {
    getMyTweets();
  }, [getMyTweets]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" />
      </form>
      <span onClick={onLogOut} className="formBtn cancelBtn logOut">
        Log Out
      </span>
      {tweets.length !== 0 && (
        <ul className="profile_tweetContainer">
          {tweets.docs.map((doc) => {
            const { attachedURL, text } = doc.data();
            return (
              <li key={doc.id} className="tweet">
                {attachedURL && (
                  <img
                    src={attachedURL}
                    alt="user"
                    width="50px"
                    height="50px"
                  />
                )}
                <input type="text" value={text} readOnly />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Profile;
