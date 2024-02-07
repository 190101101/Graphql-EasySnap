import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SNAPS } from "../../graphql/query";
import { CREATE_SNAP } from "../../graphql/mutation";

const initalState = {
  text: "",
};

const Form = ({ session }) => {
  const [values, setValues] = useState(initalState);

  const [CreateSnapMutation] = useMutation(CREATE_SNAP, {
    update(proxy, { data: { CreateSnap } }) {
      const { snaps } = proxy.readQuery({
        query: SNAPS,
      });

      proxy.writeQuery({
        query: SNAPS,
        data: {
          snaps: [CreateSnap, ...snaps],
        },
      });
    },
    optimisticResponse: {
      __typename: "Mutation",
      CreateSnap: {
        __typename: "Snap",
        id: Math.round(Math.random() * -1000000),
        text: values.text,
        createdAt: new Date(),
        user: {
          __type: "User",
          ...session.activeUser,
        },
      },
    },
    refetchQueries: [{ query: SNAPS }],
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formValidate = () => {
    const { text } = values;
    return !text || text === " ";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formValidate()) {
      return null;
    }

    setValues(initalState);

    CreateSnapMutation({
      variables: {
        user_id: session.activeUser.id,
        text: values.text,
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={values.text}
          name="text"
          className="add-snap__input"
          type="text"
          disabled={!(session && session.activeUser)}
          placeholder={
            session && session.activeUser
              ? "add Snap"
              : "please login for a new snap"
          }
        />
      </form>
    </div>
  );
};

export default Form;
