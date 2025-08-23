// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ViewOffer from "./pages/applications/ViewOffer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → View Offer */}
        <Route path="/" element={<Navigate to="/view-offer" />} />

        {/* View Offer page */}
        <Route path="/view-offer" element={<ViewOffer />} />
      </Routes>
    </Router>
  );
}

export default App;
