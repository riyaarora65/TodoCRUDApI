const {Client} = require('pg');
const express = require('express');

const app = express();

app.use(express.json())

const client =  new Client({
    user: "postgres",
    password: "mysecretpassword",
    host: "172.17.0.3",
    database: "ToDoDB",
});

app.get("/home", (req,res) => res.sendFile(`${__dirname}/index.html`));

app.get("/todos", async (req, res) => {
    const rows = await readTodos();
    res.setHeader("content-type","application/json");
    res.send(JSON.stringify(rows));
});

app.post("/todos", async (req,res) => {
    let result = {}
    try{
        const reqJson = req.body;
        await createTodo(reqJson.todo);
        result.success = true;
    }
    catch(e) {
        res.success = false;
    }
    finally {
        res.setHeader("content-type","application/json");
        res.send(JSON.stringify(result));
    }
});

app.delete("/todos", async (req,res) => {
    let result = {}
    try{
        const reqJson = req.body;
        await deleteTodo(reqJson.id)
        result.success = true;
    }
    catch(e) {
        res.success = false;
    }
    finally {
        res.setHeader("content-type","application/json");
        res.send(JSON.stringify(result));
    }
});

app.listen(8081, () => console.log('web server is listening....'))

start()
async function start() {
    await client.connect();
    const todos = await readTodos();
    console.log(todos);

    // const successCreate = await createTodo("Go to trader joes");
    // console.log(`Creating was ${successCreate}`)

}

async function readTodos() {
    try{
        const results = await client.query("Select id, text from todo");
        return results.rows;
    }
    catch(e){
        return [];
    }
}

async function createTodo(todoText) { 
    console.log('in createtodo');
    try{
        await client.query("insert into todo(text) values($1)",[todoText]);
        console.log('created');
        return true;
    }
    catch(e) {
        return false;
    }
}

async function deleteTodo(id){
    try{
        await client.query("delete from todo where id = $1",[id]);
        return true;
    }
    catch(e){
        return false;
    }
}