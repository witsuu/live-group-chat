import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Join = ({ invite = false, roomInvite = "" }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(roomInvite);

  return (
    <div className="bg-dark vw-100 vh-100">
      <div className="container">
        <div
          className="position-absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <div className="card bg-transparent" style={{ width: "400px" }}>
            <div className="card-header text-center text-white">
              <h4 className="mb-0">Join</h4>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                {invite ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Room"
                    value={roomInvite}
                    readOnly
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Room"
                    onChange={(e) => setRoom(e.target.value)}
                  />
                )}
              </div>
              <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/chat?name=${name}&room=${room}`}
                className="btn btn-primary mt-2 w-100"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
