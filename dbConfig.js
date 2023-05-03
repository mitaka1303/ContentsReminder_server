const { Pool }= require('pg');

const itemsPool = new Pool({
    connectionString: "test",
    ssl:{
        rejectUnauthorized:false
    }
})

module.exports = itemsPool;