import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedin={isLoggedin}></AppRouter>
      <footer>&copy; {new Date().getFullYear()} firebase-twitter</footer>
    </>
  );
}

export default App;
