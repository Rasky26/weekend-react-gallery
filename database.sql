-- Database name is: `react_gallery`

CREATE TABLE "image_gallery" (
    "id" SERIAL PRIMARY KEY,
    "path" VARCHAR(1023) NOT NULL,
    "description" VARCHAR(511),
    "likes" INT DEFAULT 0 CHECK ("likes" >= 0)
);

INSERT INTO "image_gallery"
    ("path", "description")
VALUES
    ('images/goat_small.jpg', 'Photo of a goat taken at Glacier National Park.'),
    ('images/squirrel-braces.png', 'Photo of a squirrel. Nothing unusual.'),
    ('images/squirrel-braces-mostly-braces.png', 'Updated photo of braces progress.'),
    ('images/cat-braces.png', 'Cat with braces, first photo after just getting braces put in.');

SELECT * FROM "image_gallery";