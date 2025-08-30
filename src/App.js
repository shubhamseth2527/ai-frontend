import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PromptPage from "./pages/genPromptPage";
import OpenPromptPage from "./pages/openPromptPage";
import { slotMachine } from "./api/slotGameApi";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">AI App</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/gen-ai">Gen AI Prompt</Link>
          <Link className="nav-link" to="/open-ai">Open AI Prompt</Link>
        </div>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/gen-ai" element={<PromptPage />} />
        <Route path="/open-ai" element={<OpenPromptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
