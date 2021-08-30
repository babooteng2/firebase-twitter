import Tweet from "components/Tweet";
import { dbService, COLLECTION_NAME } from "fbase";
import React, { useEffect, useState } from "react";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArr);
      });
    return () => {
      setTweets([]);
    };
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      {tweets.map((tweet) => {
        return (
          <Tweet
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid ? true : false}
            key={tweet.id}
          />
        );
      })}
    </div>
  );
};

export default Home;
