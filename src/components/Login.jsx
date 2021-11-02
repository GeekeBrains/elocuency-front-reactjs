import {apiPost} from 'libs/ApiCall';
import {useState} from 'react';

export const Login = ({onChange}) => {
  const [login, setLogin] = useState(localStorage.getItem('login') ?? '');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <div className="row">
        <label>Login</label>
        <input
          value={login}
          onChange={v => {
            setLogin(v.target.value);
          }}
        ></input>
      </div>
      <div className="row">
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={v => {
            setPassword(v.target.value);
          }}
        ></input>
      </div>
      <button
        className="chatButton"
        onClick={async () => {
          const resp = await apiPost('/users/login', {
            login,
            password,
          });
          onChange(resp.data);
        }}
      >
        Aceptar
      </button>
    </div>
  );
};
