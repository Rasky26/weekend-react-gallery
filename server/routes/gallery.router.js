const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require("../modules/pool")
const fs = require('fs');
const { response } = require('express');

// DO NOT MODIFY THIS FILE FOR BASE MODE


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
        ORDER BY "id" ASC
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

    // Update the `likes` count on the DB side
    const sqlQuery = `
        UPDATE "image_gallery"
        SET "likes" = "likes" + 1
        WHERE "id" = $1
    `
    // Set the `param` as an integer
    const sqlParams = [
        parseInt(req.params.id),
    ]

    // Update the like count directly on the database level.
    // Minimizes risk of erroneous get data being sent and processed.
    pool.query(sqlQuery, sqlParams)
    .then(() => res.send(201))
    .catch((error) => {
      console.log(`Error making database query ${sqlQuery} --> ${error}`);
      res.sendStatus(500);
    })
})

module.exports = router;