import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageConverter from './components/ImgCoverter';
import Text1 from './components/Task1';
import Text3 from './components/task2';

// import Footer from './components/Footer';.
function App() {
  return (
    <div className="App">
              <div className="text-container">
            <h1 className="text-title">Welcome to the Image Converter</h1>
            </div>
         <ImageConverter />
        <Text1/>
        <Text3/>
    </div>

  );
}

export default App;
