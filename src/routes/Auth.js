import { firebaseInstance, authService } from "fbase";
import React from "react";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    let provider;
    const {
      target: { name },
    } = e;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
