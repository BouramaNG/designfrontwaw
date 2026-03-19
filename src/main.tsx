import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import AppRouter from './AppRouter';

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
