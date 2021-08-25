import Tweet from "components/Tweet";
import { dbService, COLLECTION_NAME, TEXT_MAX_LENGTH } from "fbase";
import React, { useEffect, useState } from "react";

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
    return () => {
      setTweets([]);
    };
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
          maxLength={TEXT_MAX_LENGTH}
        />
        <input type="submit" value="tweet" />
      </form>
      {tweets.map((tweet) => {
        return (
          <Tweet
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid ? true : false}
            key={tweet.id}
          />
        );
      })}
    </>
  );
};

export default Home;
