import React, { useEffect, useState } from 'react';

function App() {
  const [catPic, setCatPic] = useState(); 
  const [catPics, setCatPics] = useState([]);
  const catPicUrl = 'https://api.thecatapi.com/v1/images/search';

  useEffect(() =>{
    try{
      fetch(catPicUrl).then(response => response.json()).then(picUrl => { setCatPic(picUrl); setCatPics([...catPics, picUrl])}, error => console.log(error));
    } catch(error) {console.log(error);}
  }, [])

  const handleFetch = () => {
    fetch(catPicUrl).then(response => response.json()).then(picUrl => { setCatPic(picUrl); setCatPics([...catPics, picUrl])}, error => console.log(error));
  }

  const handleGetPrevious = () => {
    let currentPicIndex = 0;
    for(let i=0; i<catPics.length; i++) {
      if(catPics[i].url === catPic.url) { currentPicIndex = i; }
  }
  setCatPic(catPics[currentPicIndex-1]);
}

  const handleGetNext = () => {
    let currentPicIndex = 0;
    for(let i=0; i<catPics.length; i++) {
      if(catPics[i].url === catPic.url) { currentPicIndex = i; }
  }
  setCatPic(catPics[currentPicIndex]);
  }
  
  return (
    <div className="App">
      <main>
        <div>
          <div>
            {catPic !== undefined && catPic.length > 0 && <img src={catPic[0].url} width='84' height='136' alt='cat-pic'/>}
            <div>url: {catPic !== undefined && catPic.length > 0 && catPic[0].url}, breed: {catPic !== undefined && catPic.length > 0 && catPic[0].breed}</div>
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
