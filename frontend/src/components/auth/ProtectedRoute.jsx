import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAllowed, to, data, children }) => {
  if (!isAllowed) return <Navigate to={to} replace state={data} />;

  return children;
};
export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  data: PropTypes.object,
  children: PropTypes.node,
};
