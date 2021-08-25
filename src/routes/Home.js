import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("firebase-tweet").add({
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
    </>
  );
};

export default Home;
