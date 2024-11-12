import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkbookContainer from './components/WorkbookContainer';
import ShadowWorkbookContainer from './components/ShadowWorkbookContainer';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workbook" element={<WorkbookContainer />} />
          <Route path="/shadow-workbook" element={<ShadowWorkbookContainer />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
