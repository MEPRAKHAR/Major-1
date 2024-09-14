import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/Editorpage';
import HomePage from './pages/Homepage';

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:roomID" element={<EditorPage />} />

     </Routes>
    </BrowserRouter>

    </>
    
  );
}

export default App;
