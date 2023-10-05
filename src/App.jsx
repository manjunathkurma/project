import React from "react";
import Header from "./shared/header";
import { Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { firebaseConfig } from "./firebase";
export const app= initializeApp(firebaseConfig)
export const auth=getAuth(app)
function App() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
