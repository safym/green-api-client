import * as React from "react";

import { AuthContextType, Instance } from "../@types/auth";

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [instance, setInstance] = React.useState<Instance>({
    idInstance: "auth id (default)",
    token: "api token (default)",
    status: false,
  });

  const setAuth = (instance: Instance) => {
    const newInstance: Instance = {
      idInstance: instance.idInstance,
      token: instance.token,
      status: false,
    };
    setInstance({...newInstance});
  };

  const updateStatus = () => {
    instance.status = !instance.status;

    setInstance({...instance});
  };

  return (
    <AuthContext.Provider value={{ instance, setAuth, updateStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
