import React from "react";
import Routers from "./Routers";
import { UserProvider } from "./UserContext.js";
import "./index.css";
import { DataProvider } from "./useContextData.js";
function App() {
  return (
    <>
      <DataProvider>
        <UserProvider>
          <Routers />
        </UserProvider>
      </DataProvider>
    </>
  );
}

export default App;
