// src/App.js
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import FilterSection from './components/FilterSection';
import ChartSection from './components/ChartSection';
import AdditionalInfo from './components/AdditionalInfo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <FilterSection />
        <ChartSection />
        <AdditionalInfo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
