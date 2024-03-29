import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { extractLinkAndFunctions, compareElements } from "../utils/helpers";
import { LINKS_ITEMS } from "../constant/app_constant";
import NotFoundPage from "../pages/NotFoundPage";
const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);
  // const location = useLocation();
  return user.token != null ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
