import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkbookContainer from './components/WorkbookContainer';
import ShadowWorkbookContainer from './components/ShadowWorkbookContainer';
import Chat from './components/Chat'; // Import the Chat component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workbook" element={<WorkbookContainer />} />
          <Route path="/shadow-workbook" element={<ShadowWorkbookContainer />} />
          <Route path="/chat" element={<Chat />} /> {/* Add the Chat route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
