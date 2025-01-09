import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Gallery from './components/Gallery';
    import MediaView from './components/MediaView';
    import NotFound from './components/NotFound';

    function App() {
      return (
        <Router>
          <div className="App">
            <h1>Media Gallery</h1>
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/media/:id" element={<MediaView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      );
    }

    export default App;
