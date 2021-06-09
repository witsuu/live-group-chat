import React, { useState, useEffect } from "react";
import "./chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import { Messages } from "../Messages";
import { Link } from "react-router-dom";
import userImg from "../../images/user_blank.png";
import dotThree from "../../images/dot.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

let socket;

export const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:4000";
  const linkInvite =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    `/invite?room=${room}`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    setMessage("");
  };

  return (
    <>
      <div className="bg-dark vw-100 vh-100">
        <div
          className="position-absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <div style={{ width: "80vw", height: "100vh" }}>
            <div className="card bg-transparent">
              <div className="card-body">
                <div className="d-flex">
                  <div className="card w-50">
                    <div className="card-header text-center">
                      <span className="fw-bold">Anggota</span>
                    </div>
                    <div className="card-body">
                      {users
                        ? users.map(({ name }) => (
                            <div className="card mb-2 border-0 border-bottom pb-2">
                              <div className="card-body d-flex p-0">
                                <img
                                  src={userImg}
                                  alt="user-profile"
                                  width="40"
                                  className="rounded-circle"
                                />
                                <div className="ms-3 d-flex flex-column justify-content-center">
                                  <span>{name}</span>
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="bg-success rounded-circle me-1 mt-1"
                                      style={{ width: "5px", height: "5px" }}
                                    ></div>
                                    <small style={{ fontSize: "10px" }}>
                                      online
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className="card w-100">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div></div>
                      <span className="fw-bold">{room}</span>
                      <img
                        src={dotThree}
                        alt="dotThree"
                        height="15"
                        data-bs-toggle="dropdown"
                      />
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link to="/" className="text-decoration-none">
                            <button className="dropdown-item" type="button">
                              Keluar group
                            </button>
                          </Link>
                        </li>
                        <li>
                          <CopyToClipboard
                            text={linkInvite}
                            onCopy={() => alert("Link berhasil dicopy")}
                          >
                            <button className="dropdown-item" type="button">
                              Salin link group
                            </button>
                          </CopyToClipboard>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body p-0" style={{ height: "85vh" }}>
                      <Messages messages={messages} name={name} />
                      <div className=" border-top p-2 d-flex bottom-0 w-100 position-absolute">
                        <input
                          type="text"
                          className="form-control"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" ? sendMessage(e) : null
                          }
                        />
                        <button
                          className="btn btn-primary ms-2"
                          onClick={(e) => sendMessage(e)}
                        >
                          KIRIM
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
