import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PubNub from "pubnub";

const pubnub = new PubNub({
  publishKey: "pub-c-dd3b5703-eb03-43f7-bbf2-a58261067c8f",
  subscribeKey: "sub-c-86ec8e7a-ac60-48f6-bbb5-62eb95d3f71d",
  uuid: "tchuilej7253",
});

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    pubnub.publish(
      {
        channel: "Quentinchannel",
        message: "logoff",
      },
      (status) => {
        if (!status.error) {
          console.log("Signal sent: logoff");
          navigate("/");
        } else {
          console.error("Failed to send signal: ", status);
        }
      }
    );
  };

  return (
    <nav>
      <div className="nav-center">
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <h3>Smart System</h3>
        </div>
        <div className="nav-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z" />
          </svg>
        </div>
        {location.pathname !== "/" && (
          <div onClick={handleLogOut} style={{ cursor: "pointer" }}>
            <h3>Log Out</h3>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;