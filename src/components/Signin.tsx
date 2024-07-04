/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import axios from "axios";

function Signin({ setUser, setSignedIn }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/signin`, {
        username,
        password,
      })
      .then((user) => {
        localStorage.setItem("accessToken", user.data.accessToken);
        localStorage.setItem("refreshToken", user.data.refreshToken);
        setErrorMessage("");
        setUser(user.data.username);
        setSignedIn(true);
        // console.log(user.data.accessToken);
        // console.log(user.data.refreshToken);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
      />
      <button onClick={submit}>Submit</button>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Signin;
