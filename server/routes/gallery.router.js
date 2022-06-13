const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require("../modules/pool")
const fs = require('fs')

// DO NOT MODIFY THIS FILE FOR BASE MODE

// PUT Route
// router.put('/like/:id', (req, res) => {
//     console.log("In router: gallery -> PUT", req.params);
//     const galleryId = req.params.id;
//     for(const galleryItem of galleryItems) {
//         if(galleryItem.id == galleryId) {
//             galleryItem.likes += 1;
//         }
//     }
//     res.sendStatus(200);
// }); // END PUT Route



// POST Route
router.post("/", (req, res) => {
    const sqlQuery = `
        INSERT INTO "image_gallery"
            ("path", "description")
        VALUES
            ($1, $2)
    `
    const sqlParams = [
        req.body.path,
        req.body.description,
    ]
    pool.query(sqlQuery, sqlParams)
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(`Error making database query ${sqlQuery} --> ${error}`);
        res.sendStatus(500);
      })
})

// GET Route
router.get("/", (req, res) => {

    // Set the SQL Query
    const sqlQuery = `
        SELECT * FROM "image_gallery"
    `

    // Get the array from the database
    pool.query(sqlQuery)
    .then(response => {
        // console.log(response.rows, "RWS")
        // const returnArray = response.rows.map(item => {
        //     if (!fs.existsSync(item.path)) {
        //         console.log("nope")
        //         item.path = 'images/default.jpg'
        //     }
        // })
        res.send(response.rows)
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlQuery} --> ${error}`);
      res.sendStatus(500);
    })
})


// PUT Route
router.put('/like/:id', (req, res) => {

    // Set the SQL Query
    const sqlQuery = `
        SELECT "likes" FROM "image_gallery"
        WHERE "id" = ($1)
    `
    const sqlParams = [
        parseInt(req.params.id),
    ]

    let currentLikeValue

    // Update the like count directly on the database level.
    // Minimizes risk of erroneous get data being sent and processed.
    pool.query(sqlQuery, sqlParams)
    .then(response => {
        console.log("resps", response)
        currentLikeValue = response
        // res.send(response.rows)
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlQuery} --> ${error}`);
      res.sendStatus(500);
    })

    const sqlQueryReturn = `
        UPDATE "image_gallery"
        SET "likes" = $2
        WHERE "id" = $1
    `
    const sqlParamsReturn = [
        parseInt(req.params.id),
        currentLikeValue++,
    ]

    pool.query(sqlQueryReturn, sqlParamsReturn)
    .then(response => res.send(201))
    .catch((error) => {
      console.log(`Error making database query ${sqlQuery} --> ${error}`);
      res.sendStatus(500);
    })
})

module.exports = router;