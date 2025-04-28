import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/context";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { appState, setAppState } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAppState({
      name: "",
      email: "",
      isLoggedIn: false,
    });

    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setAppState({
        name: user?.name,
        email: user?.email,
        isLoggedIn: true,
        picture: user?.picture,
      });
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
      <img
        style={{
          width: "120px",
          height: "120px",
          outline: "4px solid grey",
          borderRadius: "50%",
          padding: "4px",
        }}
        src={appState?.picture}
        alt="User Profile"
      />
      <h2>Welcome, {appState?.name}</h2>
      <h3>{appState?.email}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
