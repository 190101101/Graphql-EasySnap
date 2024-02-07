import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutation";
import { ACTIVE_USER } from "../graphql/query";

const initialState = {
  username: "",
  password: "",
  confirm: "",
};

const Join = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [values, setValues] = useState(initialState);

  const [CreateUserMutation, { loading }] = useMutation(CREATE_USER, {
    update(proxy, result) {
      localStorage.setItem("token", result.data.CreateUser.token);
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
    const { username, password, confirm } = values;
    return !username || !password || password !== confirm;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CreateUserMutation({ variables: values });
    setValues(initialState);
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  return (
    <>
      <form onSubmit={onSubmit} className="user-form">
        <label>
          <input
            type="text"
            onChange={onChange}
            value={values.username}
            name="username"
            placeholder="username"
          />
        </label>
        <label>
          <input
            type="password"
            onChange={onChange}
            value={values.password}
            name="password"
            placeholder="password"
          />
        </label>
        <label>
          <input
            type="password"
            onChange={onChange}
            value={values.confirm}
            name="confirm"
            placeholder="confirm"
          />
        </label>
        <label>
          <button disabled={loading || formValidation()}>join</button>
        </label>
      </form>
      {loading && <div className="loading">loading...</div>}
       {error && <div className="loading">{error}</div>} 
    </>
  );
};

export default withRouter(Join);
