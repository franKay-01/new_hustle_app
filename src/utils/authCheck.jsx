import Cookies from 'js-cookie';

import { Outlet, Navigate } from "react-router-dom"

const AuthCheck = ({ userRole }) => {
  const account_type = Cookies.get('is_ct');

  console.log("ACCOUNT TYPE ", account_type)
  
  const isHustler = account_type === 'false';
  const isCreator = account_type === 'true';

  const roleMatchesType =
    (userRole === 'hustler' && isHustler) ||
    (userRole === 'creator' && isCreator);

  const builder = () => {
    return (
      <Outlet />
    )
  }

  return roleMatchesType ? builder() : <Navigate to="/no-access" />;
};

export default AuthCheck