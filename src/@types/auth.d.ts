export interface Instance {
  idInstance: string;
  token: string;
  status: boolean;
}

export type AuthContextType = {
  instance: Instance;
  setAuth: (todo: Instance) => void;
  updateStatus: () => void;
};
