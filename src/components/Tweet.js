import React from "react";

const Tweet = ({ tweet, isOwner }) => {
  console.log(tweet);
  return (
    <div>
      <span>{tweet.text}</span>
      {isOwner && (
        <>
          <button>Edit Tweet</button>
          <button>Delete Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
