const express = require('express')
const app = express();

app.use(express.json());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cors = require('cors')

const corsOption ={
    origin: process.env.URL,
    optionsSuccessStatus: 200
}

app.use(cors())

//環境変数のロード
const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./dbConfig')

app.get("/", async(req,res)=>{
    console.log("connect DB");
    // try{
    //     const allItems = await itemsPool.query(
    //         'select * from test_table'
    //     );
    //     res.json({ allItems });
    // }catch(error){
    //     console.log(error);
    //     res.status(500).send(error.message)
    // }
})


// app.post('/getList', (req, res)=>{
//     console.log("test: getList");
//     res.send('test : getList')
// })


app.listen(4000, function(){console.log("run server")
console.log(process.env.DATABASE)
})

app.post('/getList', async(req, res)=>{
    console.log("test: getList");
    console.log(req.body)
    try{
        const allItems = await itemsPool.query(
            'select * from list'
        );
        res.json({ allItems });
    }catch(error){
        console.log(error);
        res.status(500)
    }
})

app.post('/deleteRow', async(req, res)=>{
    console.log("test: deleteRow");
    console.log(req.body.username)
    try{
        const deleteRow = await itemsPool.query(
            `delete from list where id='${req.body.id}' AND username = '${req.body.username}' AND password = '${req.body.password}'`
        );
        // res.json({ allItems });
    }catch(error){
        console.log(error);
        res.status(500)
    }
})