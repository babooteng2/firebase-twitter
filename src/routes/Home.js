import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const COLLECTION_NAME = "tweetsCollection";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
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
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection(COLLECTION_NAME).add({
      creatorId: userObj.uid,
      text: tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      {tweets.map((tweet) => {
        return (
          <Tweet
            tweet={tweet}
            isOwner={tweet.creatorId === userObj.uid ? true : false}
            key={tweet.id}
          />
        );
      })}
    </>
  );
};

export default Home;
