const { Pool }= require('pg');

const itemsPool = new Pool({
    connectionString: process.env.NODE_HOST,
    ssl:{
        rejectUnauthorized:false
    }
})

module.exports = itemsPool;