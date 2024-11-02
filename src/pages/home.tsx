import React from 'react';
import '../App.css';
import ImageConverter from '../components/ImgCoverter';
import Text1 from '../components/Task1';
import Text3 from '../components/task2';
function Home() {
  return (
    <div className="App">
 
         <ImageConverter />
        <Text1/>
        <Text3/>
    </div>

  );
}

export default Home;
