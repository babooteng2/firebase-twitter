import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoggedin(user ? true : false);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} firebase-twitter</footer>
    </>
  );
}

export default App;
