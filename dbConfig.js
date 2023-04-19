const { Pool }= require('pg');

const itemsPool = new Pool({
    connectionString: process.env.HOST,
    ssl:{
        rejectUnauthorized:false
    }
})

module.exports = itemsPool;