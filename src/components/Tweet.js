import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  COLLECTION_NAME,
  dbService,
  storageService,
  TEXT_MAX_LENGTH,
} from "fbase";
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
      // img 삭제 - URL에서 ref를 얻어 삭제
      if (tweetObj.attachedURL !== "") {
        await storageService.refFromURL(tweetObj.attachedURL).delete();
      }
    }
  };

  return (
    <div className="tweet">
      {editting && isOwner ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              value={newTweet}
              onChange={onChange}
              maxLength={TEXT_MAX_LENGTH}
              required
              autoFocus
              className="formInput"
            />
            <span type="submit" className="formBtn">
              Edit Done
            </span>
          </form>
          <span
            type="button"
            onClick={onToggleEdit}
            className="formBtn cancelBtn"
          >
            Cancel
          </span>
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
            <div className="tweet__actions">
              <span onClick={onToggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} className="colorBlue" />
              </span>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} className="colorBlue" />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
