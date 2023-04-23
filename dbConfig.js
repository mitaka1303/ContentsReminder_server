const { Pool }= require('pg');
//環境変数のロード
const dotenv = require('dotenv');
dotenv.config();

const itemsPool = new Pool({
    connectionString: "test",
    ssl:{
        rejectUnauthorized:false
    }
})

module.exports = itemsPool;