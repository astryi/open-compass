import React from "react";
import "./App.scss";
import { AppBar } from "./components/AppBar";
import DBConnectionForm from "./components/DBConnectionForm";
import { createActorContext } from "@xstate/react";
import { compassMachine } from "./machines/compassMachine";
import HomePageSidebar from "./components/HomePageSidebar";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

export const CompassContext = createActorContext(compassMachine);

function App() {
  return (
    <Router>
      <CompassContext.Provider>
        <div>
          <AppBar />
          <div style={{ marginTop: 32 }} />

          <div className="app-screens screens">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </div>
      </CompassContext.Provider>
    </Router>
  );
}

export default App;
