const express = require('express');
const app = express();
const port= process.env.port || 3030;

const {Pool}= require('pg');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//POSTGRE & PG 4 ADMIN REQUIREMENTS
const pool = new Pool({
    user:"customer",
    host:"dpg-ctago2ggph6c73eol1gg-a.oregon-postgres.render.com",
    database:"customer_info",
    password:"IPlJW8aUhVzZxH0Atat3DxSozC597xrJ",
    port:5432,
    ssl: true
})
//SHOW THAT THERE IS CONNECTION 
if(pool.connect()){
    console.log("Server is connected successfully");
}

//ROUTES to store database entries
app.post('/create_new_customer_info', async(req, res) =>{
    const {name, email, password, customer_id} = req.body;
    
    //QUERY TO INSERT VALUES INTO DATABASE users
    const query = await pool.query(
        'INSERT INTO users (name, email, password, customer_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, customer_id]
    );
    //TO SHOW THAT INFORMATION WAS CREATED
    res.status(201).json({message:"Customer Information has been created", info: query.rows[0]})
})


app.get('/get_all_customer_info', async(req, res) =>{
    const query = await pool.query(
        'SELECT * FROM users ORDER BY id ASC'
    )

    res.status(200).json(query.rows);
})



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})