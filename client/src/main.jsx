import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import {HeroUIProvider} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <GlobalProvider>
        <HeroUIProvider>
          <ToastProvider />
          <App />
        </HeroUIProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);