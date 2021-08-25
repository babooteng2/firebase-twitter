import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    console.log(e, value);
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
          name="input_tweet"
          onChange={onChange}
          value={tweet}
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
