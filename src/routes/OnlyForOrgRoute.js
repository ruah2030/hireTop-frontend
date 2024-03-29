import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const OnlyForOrgRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);

  return user.is_organisation === 1 ? element : <Navigate to="*" />;
};

export default OnlyForOrgRoute;
