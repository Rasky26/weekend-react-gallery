const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require("../modules/pool")

// DO NOT MODIFY THIS FILE FOR BASE MODE

// PUT Route
router.put('/like/:id', (req, res) => {
    console.log("In router: gallery -> PUT", req.params);
    const galleryId = req.params.id;
    for(const galleryItem of galleryItems) {
        if(galleryItem.id == galleryId) {
            galleryItem.likes += 1;
        }
    }
    res.sendStatus(200);
}); // END PUT Route

// GET Route
router.get("/", (req, res) => {

    // Set the SQL Query
    const sqlQuery = `
        SELECT * FROM "image_gallery"
    `

    // Get the array from the database
    pool.query(sqlQuery)
    .then(response => res.send(response.rows))
    .catch((error) => {
      console.log(`Error making database query ${sqlQuery} --> ${error}`);
      res.sendStatus(500);
    })
})

module.exports = router;