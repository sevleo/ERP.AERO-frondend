/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Info({ signedIn, setSignedIn, user, setUser }: any) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    axios
      .get("http://localhost:3000/info", {
        headers: {
          authorization: accessToken,
          refreshToken: refreshToken,
        },
      })
      .then((res) => {
        if (res.data.newAccessToken) {
          localStorage.setItem("accessToken", res.data.newAccessToken);
        }
        setUser(res.data.userId);
        setSignedIn(true);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setLoaded(true);
        setSignedIn(false);

        // if (
        //   err.response.statusText === "Unauthorized" &&
        //   err.response.status === 401
        // ) {
        //   console.log(err.response.statusText);
        //   axios
        //     .get("http://localhost:3000/signin/new_token", {
        //       headers: {
        //         authorization: refreshToken,
        //       },
        //     })
        //     .then((res) => {
        //       localStorage.setItem("accessToken", res.data.accessToken);
        //       console.log(res);
        //       setUser(res.data.user.id);
        //       setSignedIn(true);
        //       setLoaded(true);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       setLoaded(true);
        //     });
        // }
      });
  }, [setSignedIn, setUser]);

  return (
    <div>
      {loaded &&
        (signedIn ? (
          <div>
            <h1>Info</h1>
            <p>User ID: {user}</p>
            <button onClick={() => navigate("/")}>Go back</button>
          </div>
        ) : (
          <div>
            <p>Please log in first</p>
            <button onClick={() => navigate("/")}>Go back</button>
          </div>
        ))}
    </div>
  );
}

export default Info;
