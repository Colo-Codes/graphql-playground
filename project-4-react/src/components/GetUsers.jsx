import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import LOAD_USERS from "../GraphQL/queries.js";

function GetUsers() {
  const [lastUser, setLastUser] = useState({});
  const { error, loading, data } = useQuery(LOAD_USERS);

  // Handle data changes (when the API sends a response)
  useEffect(() => {
    console.log(">>> data", data);
    if (data) setLastUser(data.users[data.users.length - 1]);
  }, [data]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <h2>Last user data:</h2>
      <p>{`${lastUser.firstName} ${lastUser.lastName}`}</p>
      <h2>Raw data:</h2>
      <p>{JSON.stringify(lastUser, null, 2)}</p>
    </div>
  );
}

export default GetUsers;
