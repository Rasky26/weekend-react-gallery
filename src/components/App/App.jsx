// Load the core components used in App.jsx
import React, { useEffect, useState } from 'react';
import axios from "axios";

// Import the components used on the App.jsx level
import GalleryFormComponent from '../Gallery/Content/GalleryForm';
import GalleryListComponent from '../Gallery/Content/GalleryList'

// Import the stylesheets
import './App.css';

function App() {

  // ------------------------------------------------
  // STATE initialization section
  // ------------------------------------------------
  const [galleryArray, setGalleryArray] = useState([])

  // Set the STATE values upon the initial load of
  // the client-side DOM.
  useEffect(() => {
    console.log('Set the STATE')
    getAllPhotos()
    },
    // Use an empty array to only run once on load.
    []
  )

  // ------------------------------------------------
  // Routes section
  // ------------------------------------------------

  // GET all photos route
  const getAllPhotos = () => {
    // Use `axios` to make the call
    axios.get("/gallery")
    // Await and assign the response
    .then((response) => {
      console.log("Successful GET method", response.data)
      // Set the reponse data array to the associated STATE variable
      setGalleryArray(response.data)
    })
    .catch((err) => {
      console.log(`
        Error occurred in App.jsx GET method

        ${err}
      `)
    })
  }


  // Update photo `love it! count route
  const addLoveToPhoto = (photoId) => {
    axios.put(`/gallery/like/${photoId}`)
    .then(() => getAllPhotos())
    .catch((err) => {
      console.log(`
        Error occurred in App.jsx PUT method

        ${err}
      `)
    })
  }


  // Update photo `love it! count route
  const postNewPhoto = (photoObj) => {
    console.log(photoObj, "here")
    axios.post("/gallery", photoObj)
    .then(() => getAllPhotos())
    .catch((err) => {
      console.log(`
        Error occurred in App.jsx POST method

        ${err}
      `)
    })
  }


    return (
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">Gallery of My Life</h1>
        </header>

        <GalleryFormComponent
          postNewPhoto={postNewPhoto}
        />

        <GalleryListComponent
          galleryArray={galleryArray}
          addLoveToPhoto={addLoveToPhoto}
        />

      </div>
    );
}

export default App;
