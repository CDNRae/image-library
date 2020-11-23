const sqlite3 = require('sqlite3');
const winston = require('winston');

class DatabaseManager {
    constructor(dataLocation) {
        this._database = null;
        this._is_connected = null;

        this.connectToDatabase(dataLocation);

        if (this._is_connected) {
            let createQueries = [
                "CREATE TABLE tags IF NOT EXISTS (tag_id INTEGER PRIMARY KEY,tag_name TEXT NOT NULL);",
                "CREATE TABLE images IF NOT EXISTS (image_id INTEGER PRIMARY KEY,image_name TEXT,image_path TEXT NOT NULL);",
                "CREATE TABLE image_tags IF NOT EXISTS (image_tag_id INTEGER PRIMARY KEY,FOREGIN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE SET NULL);"
            ]

            //Run the create queries
            this._database.serialize(() => {
                createQueries.forEach((query) => {
                    this._database.run(query)
                })
            });

            this.haveTablesBeenCreated = true;
        }

    }

    connectToDatabase(dataLocation) {
        this._database = new sqlite3.Database(dataLocation, (err) => {
            if (err) {
                this._is_connected = false;
                console.error("Unable to connect to database", err);
            }
            else {
                this._is_connected = true;
                console.info("Connected to database successfully");
            }
        });
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
        let operationSuccessful = true;
        let imagesList;

        //Get the number of rows to insert and create a string of '(?)' based on that number for insertion
        let placeholders = images.map((image) => '(?)').join(',');

        //Write up insertion query
        let query = "INSERT INTO images(image_name, image_path) VALUES " + placeholders;

        //Format the Image objects so they can be inserted
        images.forEach((image) => {
            let temp = [image.image_name, image.image_path]
            imagesList.push(temp)
        });

        //Run query and handle errors
        this._database.run(query, imagesList, function (err) {
            if (err) {
                operationSuccessful = false;
                console.error("ERROR: Could not insert into Images table.  Details:\n" + err.message);
            }
        });

        return operationSuccessful;
    }

    getImages() {
        let rows = this._database.run("SELECT * FROM images", [], (err, rows) => {
            if (err) {
                throw err;
            }

            return rows;
        });

        return rows;
    }
}

module.exports = { DatabaseManager };