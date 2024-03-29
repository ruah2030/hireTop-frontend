import { useSelector } from "react-redux";
import {
  Navigate
} from "react-router-dom";
const AuthGuardRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user)

  return user.token == null ? (

    element
  ) : (
    <Navigate to="/" />
  );
};

export default AuthGuardRoute;