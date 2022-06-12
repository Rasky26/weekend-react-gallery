// Import the `GalleryItem` component
import GalleryItemComponent from './GalleryItem'

// Component that controls the handling of the image
// gallery array and sends each image to a sub-component
// to be displayed to the DOM. 
function GalleryListComponent({ galleryArray, addLoveToPhoto }) {

    // Return elements to be displayed to the DOM
    return (
        <>

        <h2>My Gallery</h2>
        <div className='image-gallery'>

        {/*
        
        Loop through each image in the `galleryArray` and
        send each object to the `GalleryItem` component.
        
        */}

        {galleryArray.map(galleryObj => (
            // Send the `galleryObj` to the `GalleryItem` component
            <GalleryItemComponent
                key={galleryObj.id}
                galleryObj={galleryObj}
                addLoveToPhoto={addLoveToPhoto}
            />
        ))}
        </div>
        
        </>
    )
}

export default GalleryListComponent