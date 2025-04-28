import React, { useContext, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppContext from "../context/context";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { appState, setAppState } = useContext(AppContext);

  const onSuccess = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);
    console.log("User:", user);
    setAppState({
      name: user?.name,
      email: user?.email,
      isLoggedIn: true,
      picture: user?.picture
    });
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2>Login Page</h2>
      <GoogleLogin
        theme="filled_black"
        size="large"
        logo_alignment="left"
        shape="pill"
        width={200}
        onSuccess={onSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default Home;
