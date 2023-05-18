import * as React from "react";
import { AuthContextType, Instance } from "../@types/auth";
import { AuthContext } from "../context/AuthContext";
import AuthStatus from "../components/AuthStatus";

const AuthContainer = () => {
  const { instance, updateStatus } = React.useContext(
    AuthContext
  ) as AuthContextType;

  return <AuthStatus updateStatus={updateStatus} instance={instance} />;
};

export default AuthContainer;
