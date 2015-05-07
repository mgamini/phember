// adapters/application.js

import Socket from "../helpers/phoenixsocket";

export default function() {
  console.log(Socket);

  return Socket.channels["data:store"];
}