//環境変数のロード
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express();

app.use(express.json());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cors = require('cors')

const corsOption ={
    origin: process.env.NODE_URL,
    allowedHeaders:'Content-Type',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))



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
// console.log(process.env.NODE_DATABASE)
})

app.post('/getList', async(req, res)=>{
    console.log("test: getList");
    console.log(req.body)
    try{
        let allItems = await itemsPool.query(
            'select * from list'
        );
        const updateData = await Promise.all(allItems.rows.map(async(row)=>{
            const title = row.title;
            console.log(title)
            let search = await itemsPool.query(
                `select * from contents where title like '%${title}%'`
            );
            console.log("rowCount"+ search.rowCount)
            const siteName = (search.rowCount >= 1  ? search.rows[0].site: 'tbd')
            return {
                id:row.id,
                username: row.username,
                password: row.password,
                title: row.title,
                site: siteName,
                result: row.result,
                checked: row.checked
            }
        }))
        res.json({ updateData });
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

app.post('/addRow', async(req, res)=>{
    console.log("test: addRow");
    console.log(req.body.username)
    try{
        const deleteRow = await itemsPool.query(
            `insert into list (username , password , title , last_update , result , checked ) values('${req.body.username}','${req.body.password}', '${req.body.title}','2023-4-1',false,false)`
        );
        // res.json({ allItems });
    }catch(error){
        console.log(error);
        res.status(500)
    }
})