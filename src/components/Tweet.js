import { COLLECTION_NAME, dbService, TEXT_MAX_LENGTH } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editting, setEditting] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const TEXT_DB_PATH = `${COLLECTION_NAME}/${tweetObj.id}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweetObj.text !== newTweet) {
      await dbService.doc(TEXT_DB_PATH).update({
        text: newTweet,
      });
    }
    onToggleEdit();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  const onToggleEdit = () => {
    setEditting((prev) => !prev);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete it?");
    if (ok) {
      await dbService.doc(TEXT_DB_PATH).delete();
    }
  };

  return (
    <div>
      {editting ? (
        <>
          {isOwner && (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={newTweet}
                onChange={onChange}
                maxLength={TEXT_MAX_LENGTH}
                required
              />
              <button type="button" onClick={onToggleEdit}>
                Cancel
              </button>
              <button type="submit">Edit Done</button>
            </form>
          )}
        </>
      ) : (
        <>
          <span>{tweetObj.text}</span>
          {tweetObj.attachedURL && (
            <img
              src={tweetObj.attachedURL}
              alt="user"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onToggleEdit}>Edit Tweet</button>
              <button onClick={onDeleteClick}>Delete Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
