import * as React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";
import { LoaderView } from "../components/Loader/Loader";

export const RequireAuth = ({ children }) => {
  const user = useAuthStore.getState().user;
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const [loggedIn, setLoggedIn] = React.useState(null);

  React.useEffect(() => {
    checkLogin().then((value) => {
      setLoggedIn(value);
    });
  });

  if (user == null) {
    return <Navigate to={"/login"} replace={true} />;
  }

  if (loggedIn == null) {
    return <LoaderView />;
  } else {
    if (!loggedIn) {
      return <Navigate to={"/login"} replace={true} />;
    } else {
      console.log("return children");
      return <>{children}</>;
    }
  }
};
