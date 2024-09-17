import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/Editorpage';
import HomePage from './pages/Homepage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
      <>
          <div>
              <Toaster
                  position="top-right"
                  toastOptions={{
                      success: {
                          theme: {
                              primary: '#4aed88',
                          },
                      },
                  }}
              ></Toaster>
          </div>
        

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
