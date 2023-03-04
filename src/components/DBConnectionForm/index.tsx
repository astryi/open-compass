import { CompassContext } from "@/App";
import React, { useState } from "react";
import { DBType } from "../../machines/compassMachine.d";
import "./styles.scss";

const DB_LIST = ["Postgres", "MySQL", "SqLite", "MongoDB"];

const DBConnectionForm = () => {
  const [state, send] = CompassContext.useActor();
  const [dbType, setDBType] = useState<DBType>("postgres");
  const [connectionURL, setConnectionURL] = useState<string>("localhost");
  const [dbPort, setDbPort] = useState<number>(5432);
  const [userName, setUserName] = useState<string>("postgres");
  const [userPass, setUserPass] = useState<string>("");
  const [formErr, setFormErr] = useState<{ msg: string }>({ msg: "" });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    send({
      type: "submitForm",
      data: {
        type: dbType,
        url: connectionURL.trim(),
        port: dbPort,
        userName: userName.trim(),
        password: userPass,
      },
    });
  }

  console.log(state.context.connectionFormState);

  return (
    <div className="db-conn-form-wrapper">
      <h2 className="intro-title">Connect DB</h2>
      <form className="db-conn-form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="db-type">Select DB</label>
          <select id="db-type" value={dbType}>
            {DB_LIST.map((db, i) => (
              <option key={i} value={db.toLowerCase()}>
                {db}
              </option>
            ))}
          </select>
        </div>
        <div className="group-field">
          <div>
            <label htmlFor="db-conn-url">Connection URL</label>
            <input
              type="text"
              id="db-conn-url"
              value={connectionURL}
              onChange={(e) => setConnectionURL(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="port">PORT</label>
            <input
              type="text"
              id="port"
              value={dbPort}
              onChange={(e) => setDbPort(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save & connect</button>
          <button type="submit">Connect</button>
        </div>
      </form>
    </div>
  );
};

export default DBConnectionForm;
