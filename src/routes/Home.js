import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const COLLECTION_NAME = "firebase-tweet";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const querySnapshot = await dbService.collection(COLLECTION_NAME).get();
    querySnapshot.forEach((doc) => {
      // set 으로 시작하는 함수를 사용할 때 리액트는 이전의 값을 참조할 수 있게 해준다. [curr, prev]
      const tweetObj = {
        id: doc.id,
        ...doc.data(),
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection(COLLECTION_NAME).add({
      tweet,
      createAt: Date.now(),
    });
    setTweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };
  console.log(tweets);
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
        return <p key={tweet.id}>{tweet.tweet}</p>;
      })}
    </>
  );
};

export default Home;
