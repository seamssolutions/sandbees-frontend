import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import TaskManagement from './components/TaskManagement/TaskManagement';
import FinancialManagement from './components/FinancialManagement/FinancialManagement';
import CustomerManagement from './components/CustomerManagement/CustomerManagement';
import AIAssistant from './components/AIAssistant/AIAssistant';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Update active section based on current route
  const handleRouteChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <Router>
      <div className="app">
        <Navigation activeSection={activeSection} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/dashboard" 
              element={<Dashboard onMount={() => handleRouteChange('dashboard')} />} 
            />
            <Route 
              path="/tasks" 
              element={<TaskManagement onMount={() => handleRouteChange('tasks')} />} 
            />
            <Route 
              path="/finances" 
              element={<FinancialManagement onMount={() => handleRouteChange('finances')} />} 
            />
            <Route 
              path="/customers" 
              element={<CustomerManagement onMount={() => handleRouteChange('customers')} />} 
            />
            <Route 
              path="/ai-assistant" 
              element={<AIAssistant onMount={() => handleRouteChange('ai-assistant')} />} 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
