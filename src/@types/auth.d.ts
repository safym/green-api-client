export interface Instance {
  idInstance: string
  token: string
  isAuth: boolean
}

export interface AuthContextType {
  instance: Instance
  setAuth: (data: Instance) => void
}
