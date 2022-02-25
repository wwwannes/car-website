import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import searchPanelContext from './composables/Contexts';

import CustomNavigation from './components/general/CustomNavigation';

import Homepage from './views/Homepage2';
import SearchResultPage from './views/SearchResultPage';
import VehicleDetails from './views/VehicleDetailPage';

function App() {
  const [searchState, setSearchState] = useState(false);
  const toggleSearchPanel = () => {
    setSearchState(!searchState);
  }

  const searchPanelSettings = {
    isOpen: searchState,
    toggleSearchPanel
  }

  return (
    <>
      <searchPanelContext.Provider value={searchPanelSettings}>
        <Router>
          <CustomNavigation/>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/vehicles" element={<SearchResultPage/>}/>
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
      </searchPanelContext.Provider>
    </>
  );
}

export default App;