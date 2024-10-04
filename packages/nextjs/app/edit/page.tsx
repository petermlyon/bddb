"use client";

import { useState } from "react";
import { User } from "../ApiClasses/User";
import { useHelpers } from "../utils/helpers";
import { NextPage } from "next";

const Edit: NextPage = () => {
  const { updateMe } = useHelpers();
  const [user, setUser] = useState<User>({
    displayName: "",
    description: "",
  });

  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Add/Edit identity</h1>
        <p>
          Display Name
          <input
            type="text"
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.displayName = e.target.value;
              setUser(newUser);
            }}
          />
        </p>
        <p>
          TG Name
          <input
            type="text"
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.tg = e.target.value;
              setUser(newUser);
            }}
          />
        </p>
        <button onClick={() => updateMe(user)}>Write Changes</button>
      </div>
    </>
  );
};

export default Edit;
