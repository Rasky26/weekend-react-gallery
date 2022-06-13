// Import the CSS module file
import styles from "../Gallery.module.css"

// Import `useState` to track the form inputs
import { useState } from "react"

// Function that handles the form display and the
// input fields of that form
function GalleryFormComponent({ postNewPhoto }) {

    // Set the STATE variables that will be referenced
    const [imagePath, setImagePath] = useState("")
    const [description, setDescription] = useState("")

    console.log(imagePath, description)

    // Function that handles the submission of the form
    const handleImageSubmission = (e) => {
        
        // Stop the reload on submit
        e.preventDefault()

        console.log("Submitting the information")
        postNewPhoto({
            path: imagePath,
            description: description,
        })
    }

    return (
        <div className="form-container">
            <h2>Add New Image To Gallery</h2>
            <form onSubmit={handleImageSubmission} className={styles.image_form}>
                <input
                    type="text"
                    placeholder="image/route.png"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Picture description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Image</button>
            </form>
        </div>
    )
}

export default GalleryFormComponent