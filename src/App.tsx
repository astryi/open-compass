import React from "react";
import nodeLogo from "./assets/node.svg";
import { useState } from "react";
import "./App.scss";
import { AppBar } from "./components/AppBar";
import DBConnectionForm from "./components/DBConnectionForm";
import { createActorContext } from "@xstate/react";
import { compassMachine } from "./machines/compassMachine";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

export const CompassContext = createActorContext(compassMachine);

function App() {
  const [count, setCount] = useState(0);

  return (
    <CompassContext.Provider>
      <div>
        <AppBar />

        {/* DB connection form */}
        <DBConnectionForm />
      </div>
    </CompassContext.Provider>
  );
}

export default App;
