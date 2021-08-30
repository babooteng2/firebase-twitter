import React, { useRef, useState } from "react";
import {
  dbService,
  storageService,
  COLLECTION_NAME,
  TEXT_MAX_LENGTH,
} from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachedImg, setAttachedImg] = useState("");
  const imgInput = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweet === "") return;
    let attachedURL = "";
    if (attachedImg !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachedImg, "data_url");
      attachedURL = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      creatorId: userObj.uid,
      text: tweet,
      createdAt: Date.now(),
      attachedURL,
    };

    // set Image upload first
    await dbService.collection(COLLECTION_NAME).add(tweetObj);
    setTweet("");
    onClearImg();
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const {
        target: { result },
      } = e;
      setAttachedImg(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearImg = () => {
    setAttachedImg("");
    imgInput.current.value = null;
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={TEXT_MAX_LENGTH}
          className="factoryInput__input"
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photo</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        className="attachFile"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={imgInput}
      />
      {attachedImg && (
        <div className="factoryForm__attachment">
          <img
            src={attachedImg}
            width="50px"
            height="50px"
            alt="userSelect"
            style={{ backgroundImage: attachedImg }}
          />
          <div onClick={onClearImg} className="factoryForm__clear">
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
