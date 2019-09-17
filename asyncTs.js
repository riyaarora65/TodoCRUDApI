const {Client} = require('pg');

const client =  new Client({
    user: "postgres",
    password: "mysecretpassword",
    host: "172.17.0.2",
    database: "employees",
});


exceute();

async function exceute(){
    try{
        await client.connect()
        await client.query("BEGIN")
        await client.query("insert into employee values($1, $2)",[111,'Ali'])
        console.log('Inserted record')
        await client.query("COMMIT")
    }
    catch(e){
        console.log(`failed to execute something ${e} this`)
        await client.query("ROLLBACK")
    }
    finally{
        await client.end()
        console.log('Cleaned.')
    }
}