import * as React from 'react';
import { Instance } from '../@types/auth';

type Props = {
  instance: Instance;
  updateStatus: () => void;
};

const AuthStatus: React.FC<Props> = ({ instance, updateStatus }) => {
  return (
    <div>
      <div>
        <h3>{instance.idInstance}</h3>
        <p>{instance.token}</p>
        <p>{ instance.status ? `true` : 'false'}</p>
      </div>
      <button onClick={() => updateStatus()}>
        toggle status
      </button>
    </div>
  );
};

export default AuthStatus;
