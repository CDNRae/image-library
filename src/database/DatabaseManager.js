const sqlite3 = require('sqlite3');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: '../../logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '../../logs/combined.log' }),
    ],
});

class DatabaseManager {
    constructor() {
        if (!DatabaseManager.instance) {
            this._connection = null;
            this._has_connected = false;
            DatabaseManager.instance = this;
        }

        return DatabaseManager.instance;
    }

    initializeConnection(dataLocation) {
        if (!this._has_connected) {
            const databasePath = dataLocation + "/data/data.sql";
            this._connection = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                    logger.error("Unable to connect to database");
                }
                else {
                    this._has_connected = true;
                    logger.info("Connected to database successfully");
                }
            });
        }
    }
}

const instance = new DatabaseManager();
Object.freeze(instance);

export default instance;