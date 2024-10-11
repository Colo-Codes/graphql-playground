import { useState } from "react";
import { CREATE_USER } from "../GraphQL/mutations.js";
import { useMutation } from "@apollo/client";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 'createUser' is the name of the mutation we defined in the 'index.js' file in our GraphQL API schema
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);

    // The createUser mutation is a promise
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    }).then(() => window.location.reload());

    if (error) {
      console.log(">>> error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
