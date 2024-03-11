import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthComponent from './components/AuthComponent/AuthPage.jsx';
import Header from './components/header/header';
import { AuthProvider } from './components/AuthComponent/AuthComponent.jsx';
import AllMovies from './components/movieInfo/allMovies.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/OPI_proj/mainScreenMovies" element={<AllMovies/>} />
            <Route path="/OPI_proj/" element={<AuthComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;