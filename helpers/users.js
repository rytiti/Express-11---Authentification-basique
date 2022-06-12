const crypto = require('crypto');
require('dotenv').config();

const PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY;

const calculateToken = (userEmail = "") => {
    return crypto.createHash('md5').update(userEmail + PRIVATE_KEY).digest("hex");
}

module.exports = { calculateToken };