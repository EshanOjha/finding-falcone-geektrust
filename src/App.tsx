import React from 'react';
import './App.css';
import { Dashboard} from './Components/DashboardComponent';
import { Result } from './Components/ResultComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
