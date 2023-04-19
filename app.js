const express = require('express')
const app = express();

app.use(express.json());

//環境変数のロード
const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./dbConfig')

app.get("/", async(req,res)=>{
    console.log("connect DB");
    try{
        const allItems = await itemsPool.query(
            'select * from test_table'
        );
        res.json({ allItems });
    }catch(error){
        console.log(error);
        res.status(500).send(error.message)
    }
})





app.listen(4000, function(){console.log("run server")
console.log(process.env.DATABASE)
})
