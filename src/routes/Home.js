import Tweet from "components/Tweet";
import {
  dbService,
  COLLECTION_NAME,
  TEXT_MAX_LENGTH,
  storageService,
} from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachedImg, setAttachedImg] = useState();
  const imgInput = useRef();

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
    //이미지는 userId 로 storage 에 폴더로 구분되어 저장된다.
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachedImg, "data_url");
    const attachedURL = await response.ref.getDownloadURL();
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

  const onClearImg = () => {
    setAttachedImg(null);
    imgInput.current.value = null;
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={imgInput}
        />
        <input type="submit" value="tweet" />
        {attachedImg && (
          <div>
            <img
              src={attachedImg}
              width="50px"
              height="50px"
              alt="userSelect"
            />
            <button onClick={onClearImg}>Clear</button>
          </div>
        )}
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
