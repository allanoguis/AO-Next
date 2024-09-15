import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";

// ... component code ...

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{/* Main content goes here */}</main>
    </div>
  );
}

export default Home;
