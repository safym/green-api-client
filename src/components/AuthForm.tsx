import * as React from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType, Instance } from '../@types/auth';

const AuthForm: React.FC = () => {
  const { setAuth } = React.useContext(AuthContext) as AuthContextType;
  const [formData, setFormData] = React.useState<Instance | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: Instance | any) => {
    e.preventDefault();
    setAuth(formData);
  };

  return (
    <form onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="id">ID</label>
          <input onChange={handleForm} type="text" id="idInstance" />
        </div>
        <div>
          <label htmlFor="token">Token</label>
          <input onChange={handleForm} type="text" id="token" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Login</button>
    </form>
  );
};

export default AuthForm;
