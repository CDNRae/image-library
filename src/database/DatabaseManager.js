const sqlite3 = require('sqlite3');

class DatabaseManager {
    constructor(dataLocation) {
        this._is_connected = false;

        this.connectToDatabase(dataLocation).then(() => {
            if (this._is_connected) {
                this._database.run("PRAGMA foreign_keys = ON")

                let createQueries = [
                    "CREATE TABLE IF NOT EXISTS tags (tag_id INTEGER PRIMARY KEY,tag_name TEXT NOT NULL)",
                    "CREATE TABLE IF NOT EXISTS images (image_id INTEGER PRIMARY KEY,image_name TEXT,image_path TEXT NOT NULL)",
                    "CREATE TABLE IF NOT EXISTS image_tags (image_tag_id INTEGER PRIMARY KEY,tag_id INTEGER NOT NULL,FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE)"
                ]

                //Run the create queries
                this._database.serialize(() => {
                    createQueries.forEach((query) => {
                        this._database.run(query)
                    })
                });

                this._haveTablesBeenCreated = true;
                console.log("Tables have been created");
            }
            else {
                console.error("Was unable to connect to database");
            }
        });
    }

    connectToDatabase(dataLocation) {
        return new Promise((resolve, reject) => {
            this._database = new sqlite3.Database(dataLocation, (err) => {
                if (err) {
                    this._is_connected = false;
                    reject("Unable to connect to database", err);
                }
                else {
                    this._is_connected = true;
                    resolve("Connected to database successfully");
                }
            });
        })

    }

    closeDatabase() {
        if (this._is_connected) {
            this._database.close();
            this._is_connected = false;
        }
    }

    /**
    * Inserts one or more tags into the tags database
    * @param {Tag[]} tags: An array of Tag objects to be inserted
    * @return {Boolean} operationSuccessful: "True" if insert was successful; false if not
    */
    insertTags(tags) {
        let operationSuccessful = true;

        //Get the number of rows to insert and create a string of '(?)' based on that number for insertion
        let placeholders = tags.map((tag) => '(?)').join(',');

        //Write up insertion query, map tag names out as they are the only value needed from the Tag object
        //IDs are added automatically
        let query = "INSERT INTO tags(tag_name) VALUES " + placeholders;
        let tagNames = tags.map((tag) => tag.tag_name).join(',');

        //Run query and handle errors
        this._database.run(query, tagNames, function (err) {
            if (err) {
                operationSuccessful = false;
                console.error("ERROR: Could not insert into Tags table.  Details:\n" + err.message);
            }
        });

        return operationSuccessful;
    }

    /**
    * Inserts one or more images into the images database
    * @param s: An array of Image objects to be inserted
    * @return {Boolean} operationSuccessful: "True" if insert was successful; false if not
    */
    insertImages(images) {
        return new Promise((resolve, reject) => {
            let imagesList = [];
            images = JSON.parse(images);

            //Get the number of rows to insert and create a string of '(?)' based on that number for insertion
            let placeholders = images.map((image) => '(?, ?)').join(',');

            //Write up insertion query
            let query = "INSERT INTO images(image_name, image_path) VALUES " + placeholders;

            //Format the Image objects so they can be inserted
            images.forEach((image) => {
                imagesList.push(image.name, image.path)
            });

            //Run query and handle errors

            this._database.run(query, imagesList, function (err) {
                if (err) {
                    reject({status: "fail", message: "Import failed.  Error: " + err});
                }
            });

            resolve({status: "success", message: "Images imported successfully."});
        });
    }

    async getImages() {
        return new Promise((resolve, reject) => {
            this._database.all("SELECT * FROM images", [], (err, rows) => {
                if (err) {
                    reject(err)
                }
                console.log("running callback");
                resolve(rows);
            });
        })
    }
}

module.exports = { DatabaseManager };