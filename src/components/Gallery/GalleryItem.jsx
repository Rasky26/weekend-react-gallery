// Import `useState`
import { useState } from "react"

// Import used components
import GalleryItemDescriptionComponent from "./GalleryItemDescription"

// Import the CSS module file
// REF: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
import styles from "./Gallery.module.css"

// Function that handles rending a specific
// image-related object `galleryObj` to the DOM
function GalleryItemComponent({ galleryObj, addLoveToPhoto }) {

    // Control the display state for the description text, initialized as hidden
    const [displayDescription, setDisplayDescription] = useState(false)

    // Function to add a `love it!` count to
    // the associated photo.
    const onClickLoveIt = () => {
        // Call the PUT route routine that updates the count
        addLoveToPhoto(galleryObj.id)
    }

    // Return each individual image card to be
    // rendered to the DOM
    return (
        <div className="card">
            <div
                className="card-image-container"
                // Function that toggles between showing / hiding the desciption
                onClick={()=>setDisplayDescription(!displayDescription)}>

                <img className={styles.gallery__img} src={galleryObj.path} alt={galleryObj.description} />

                {/* Either displays the description or renders nothing to the DOM */}
                {displayDescription ?
                    <GalleryItemDescriptionComponent description={galleryObj.description}/> :
                    null
                }

            </div>
            {/* <p>{galleryObj.description}</p> */}
            <button className={styles.gallery__button} onClick={onClickLoveIt}>love it!</button>
            {/* 
            Use a ternary to choose which phrase to display
            */}
            {
                galleryObj.likes > 0 ?
                <p className="photo-likes">
                    <span className="photo-likes-number">{galleryObj.likes}</span> people love this!
                </p> :
                <p className="photo-likes photo-likes--none">No people love this :(</p>
            }
        </div>
    )
}

export default GalleryItemComponent