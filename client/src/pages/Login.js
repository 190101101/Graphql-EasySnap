import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutation";
import { ACTIVE_USER } from "../graphql/query";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [values, setValues] = useState(initialState);

  const [SignInMutation, { loading }] = useMutation(SIGN_IN, {
    update(proxy, result) {
      console.log(result);
      localStorage.setItem("token", result.data.SignIn.token);
      history.push("/");
    },
    onError(error) {
      // console.log(error.graphQLErrors[0]);
      // setError(error.graphQLErrors[0]);
      setError(error.message);
    },
    refetchQueries: [{ query: ACTIVE_USER }],
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    const { username, password } = values;
    return !username || !password;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    SignInMutation({ variables: values });
    setValues(initialState);
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 1000);
  }, [error]);

  return (
    <>
      <form onSubmit={onSubmit} className="user-form">
        <label>
          <input
            onChange={onChange}
            value={values.username}
            type="text"
            name="username"
            placeholder="username"
          />
        </label>
        <label>
          <input
            onChange={onChange}
            value={values.password}
            type="password"
            name="password"
            placeholder="password"
          />
        </label>
        <label>
          <button disabled={loading || formValidation()}>Login</button>
        </label>
      </form>
      {loading && <div className="loading">loading...</div>}
      {error && <div className="loading">{error}</div>} 
    </>
  );
};

export default withRouter(Login);
