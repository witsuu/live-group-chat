import React from "react";
import { Join } from "./Join";
import queryString from "query-string";

export const Invite = ({ location }) => {
  const { room } = queryString.parse(location.search);
  return <Join invite={true} roomInvite={room} />;
};
