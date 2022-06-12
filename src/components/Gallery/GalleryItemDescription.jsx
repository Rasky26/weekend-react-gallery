// Import the CSS module file
import styles from "./Gallery.module.css"

// Function that handles the display of a photo's description
function GalleryItemDescriptionComponent({ description }) {
    
    // Return the photo description to the DOM
    return (
        <div className={styles.photo_description_container}>
            <p>{description}</p>
        </div>
    )
}

export default GalleryItemDescriptionComponent