import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ReportingAndCompilence from './components/ReportingAndCompilence/ReportingAndCompilence';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportingAndCompilence />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
