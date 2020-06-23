import React, { useEffect, useState } from 'react';
import './CatPictures.css';

function App() {
  const [currPicInd, setCurrPicInd] = useState(0); 
  const [catPics, setCatPics] = useState([]);
  const catPicUrl = 'https://api.thecatapi.com/v1/images/search';

  useEffect(() => {
    try{
      getPic();
    } catch(error) {console.log(error);}
  }, [])

  const getPic = () => {
    fetch(catPicUrl).then(response => response.json()).then(picUrl => { setCatPics([...catPics, picUrl[0]]); setCurrPicInd(catPics.length)}, error => console.log(error));
  } 

  const handleFetch = () => {
    getPic();
  }

  const handleGetPrevious = () => {
    if(currPicInd === 0) return;
    setCurrPicInd(currPicInd - 1);
  }

  const handleGetNext = () => {
    if(currPicInd === catPics.length - 1) return;
    setCurrPicInd(currPicInd + 1);
  }
  
  return (
    <div className="App">
      <main>
        <div className="imgContainer">
          { catPics !== undefined && catPics.length > 0 && catPics[currPicInd] && <img src={catPics[currPicInd].url} height='500px' alt='cat-pic'/>}
          <div className="imgWrapper">
            <div className="catAttributes">
              <div>Origin: {catPics !== undefined && catPics.length > 1 && catPics[currPicInd].breeds[0] && catPics[currPicInd].breeds[0].origin}; 
              Life span: {catPics !== undefined && catPics.length > 1 && catPics[currPicInd].breeds[0] && catPics[currPicInd].breeds[0].life_span}; 
              Breed: {catPics !== undefined && catPics.length > 1 && catPics[currPicInd].breeds[0] && catPics[currPicInd].breeds[0].name}</div>
              <div>Description: {catPics !== undefined && catPics.length > 1 && catPics[currPicInd].breeds[0] && catPics[currPicInd].breeds[0].description}</div>
              <div>Url: {catPics !== undefined && catPics.length > 0 && catPics[currPicInd].url}</div>
            </div>
            <div className="fetchNewCat"><button onClick={handleFetch}>Fetch New Cat</button></div>
            </div>
        </div>
        <div className='navigator'>
          <button className='navButtonPrev' onClick={handleGetPrevious}>Previous</button>
          <button className='navButtonNext' onClick={handleGetNext}>Next</button>
        </div>
      </main>
    </div>
  );
}

export default App;
