import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import Favorites from './pages/Favorites';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;