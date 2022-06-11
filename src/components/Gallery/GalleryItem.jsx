// Function that handles rending a specific
// image-related object `galleryObj` to the DOM
function GalleryItemComponent({ galleryObj }) {

    // Return each individual image card to be
    // rendered to the DOM
    return (
        <div className="card">
            <img src={galleryObj.path} alt={galleryObj.description} />
            <p>{galleryObj.description}</p>
        </div>
    )
}

export default GalleryItemComponent