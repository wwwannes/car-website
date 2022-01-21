import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SearchResultPage from './views/SearchResultPage';
import VehicleDetails from './views/VehicleDetailPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchResultPage/>}/>
          <Route path="/vehicle/:manufacturer/:model/:id" element={<VehicleDetails/>}/>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;