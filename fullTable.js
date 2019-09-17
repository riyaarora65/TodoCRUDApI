const {Client} = require('pg');
const client =  new Client({
    user: "postgres",
    password: "mysecretpassword",
    host: "172.17.0.2",
    database: "employees",
});

client.connect()
.then(() => console.log('Connected successfully'))
.then(() => client.query("SELECT * from employee"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())