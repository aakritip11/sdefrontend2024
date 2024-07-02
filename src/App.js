import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItems from './Components/AddItems';
import Explore from './Components/Explore';

function App() {
  
  return (
    <Router>
      <AddItems/>
      <Explore/>
      <Routes>
        {/* <Route path='/AddItems' element={<AddItems />} />
        <Route path='/Explore' element={<Explore />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
