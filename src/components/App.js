import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
//https://console.developers.google.com/apis/credentials

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj({ ...authService.currentUser });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedin={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer className="footer">
        &copy; {new Date().getFullYear()} firebase-twitter
      </footer>
    </>
  );
}

export default App;
