import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import {HeroUIProvider} from "@heroui/react";
import { ThemeProvider as HeroThemesProvider } from "next-themes";
import {ToastProvider} from "@heroui/toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <GlobalProvider>
        <HeroUIProvider>
          <HeroThemesProvider attribute="class" defaultTheme="dark">
            <ToastProvider />
            <App />
          </HeroThemesProvider>
        </HeroUIProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);