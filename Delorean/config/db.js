const mysql = require('mysql2');
const tunnel = require('tunnel-ssh');
const fs = require('fs');
require('dotenv').config();

if (typeof tunnel !== 'function') {
    console.error('Error: tunnel-ssh did not load correctly.');
    process.exit(1);
}

const config = {
    username: process.env.SSH_USER,
    host: process.env.SSH_HOST,
    privateKey: fs.readFileSync(process.env.SSH_KEY_PATH),
    dstHost: process.env.DB_HOST,
    dstPort: process.env.DB_PORT,
    localHost: '127.0.0.1',
    localPort: 3307
};

const poolConfig = {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3307,
    database: process.env.DB_NAME
};

tunnel(config, (error, server) => {
    if (error) {
        console.log('SSH connection error:', error);
    } else {
        const pool = mysql.createPool(poolConfig);
        global.db = pool.promise();

        console.log('');
        console.log('Connected to the database Mother Fucker');
        console.log('***************************************');
        console.log('-------     LOCALHOST:3000      -------');
        console.log('***************************************');
    }
});

module.exports = poolConfig;
