import { authService, COLLECTION_NAME, dbService } from "fbase";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);
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
      const response = await userObj.updateProfile({
        displayName: newDisplayName,
      });
      console.log(response);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  return (
    <>
      <h2>Profile</h2>
      <button onClick={onLogOut}>Log Out</button>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      {tweets.length !== 0 && (
        <ul>
          {tweets.docs.map((doc) => {
            const { attachedURL, text } = doc.data();
            return (
              <li key={doc.id}>
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
    </>
  );
};
export default Profile;
