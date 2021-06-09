import React from "react";
import "./message.css";

export const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="d-flex justify-content-end">
      <div
        className="card m-2 border-primary"
        style={{ maxWidth: "60%", minWidth: "30%" }}
      >
        <div className="card-header p-1 ps-2 bg-primary text-white">
          <span>{trimmedName}</span>
        </div>
        <div className="card-body p-1 ps-2 pe-2">{text}</div>
      </div>
    </div>
  ) : user === "admin" ? (
    <div className="d-flex justify-content-center m-2">
      <div className="bg-secondary text-white ps-3 pe-3 rounded pb-1">
        <small className="fw-bold">{text}</small>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-start">
      <div
        className="card m-2 border-success"
        style={{ maxWidth: "60%", minWidth: "30%" }}
      >
        <div className="card-header p-1 ps-2 bg-success text-white">
          <span>{user}</span>
        </div>
        <div className="card-body p-1 ps-2 pe-2">{text}</div>
      </div>
    </div>
  );
};
