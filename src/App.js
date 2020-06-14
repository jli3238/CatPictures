import React, { useEffect, useState } from 'react';
import '../src/index.css';

function App() {
  const [catPic, setCatPic] = useState({}); 
  const [catPics, setCatPics] = useState([]);
  const catPicUrl = 'https://api.thecatapi.com/v1/images/search';

  useEffect(() => {
    try{
      fetch(catPicUrl).then(response => response.json()).then(picUrl => { setCatPic(picUrl[0]); setCatPics([...catPics, picUrl[0]])}, error => console.log(error));
    } catch(error) {console.log(error);}
  }, [])

  const handleFetch = () => {
    fetch(catPicUrl).then(response => response.json()).then(picUrl => { setCatPic(picUrl[0]); setCatPics([...catPics, picUrl[0]])}, error => console.log(error));
  }

  const handleGetPrevious = () => {
    const currentPicIndex = catPics.findIndex(pic => pic.url === catPic.url);
    setCatPic(catPics[currentPicIndex-1]);
}

  const handleGetNext = () => {
    let currentPicIndex = catPics.findIndex(pic => pic.url === catPic.url);
    setCatPic(catPics[currentPicIndex]);
  }
  
  return (
    <div className="App">
      <main>
        <div className="imgContainer">
          <div className="imgWrapper">
            {catPic !== undefined && <img src={catPic.url} height='500px' alt='cat-pic'/>}
            <div>url: {catPic !== undefined && catPic.url}, breed: {catPic !== undefined && catPic.breed}</div>
            <button onClick={handleFetch}>Fetch New</button>
          </div>
          <div className='navigator'>
            <button className='navButton' onClick={handleGetPrevious}>Previous</button>
            <button className='navButton' onClick={handleGetNext}>Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
