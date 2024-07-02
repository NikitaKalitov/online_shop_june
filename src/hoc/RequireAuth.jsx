import * as React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const [loggedIn, setLoggedIn] = React.useState(null);

  React.useEffect(() => {
    checkLogin().then((value) => { setLoggedIn(value) });
  }, []);


  if (loggedIn != null) {
    if (!loggedIn) {
      return <Navigate to={"/login"} replace={true} />;
    } else {
      console.log("return children");
      return <>{children}</>;
    }
  }
};
