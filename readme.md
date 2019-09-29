**Basic CRUD TODOAPI API Using NODE and EXPRESS and using POSTGRES DATABASE**


This Project is about creating a web server in node using express and using Postgress as a database. We will be using docker to install Postgres and PGAdmin.

1) Installing Postgress Database and PGAdmin Instance through Docker

To install postgress database - 

docker run -p 5432: 5432 --name pg POSTGRES_PASSWORD=mysecretpassword postgres

Insatlling PGAdmin - 
docker run -p 5555:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL = 'riya@gmail.com' -e PGADMIN_DEFAULT_PASSWORD = 'mysecretpassword' dpage/pgadmin

PGAdmin will work on localhost:5555.

To start containers - 
pg
docker container start pgadmin 
docker container start pg

To stop the container - 
docker container stop [Container-ID]

To know the IP of a running container - 
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id

Configuring PGAdmin - 
Browse to localhost:5555 and login with the credentials you gave at the time of installation. PGAdmin UI interface will open up. 
Now create a new server by entering the details and then create a database named ToDoDB. 
Inside this database create a table named todo. Add two columns in this table id and text.

Running the API - 
cd into the cloned directory of the project and then run npm install.
After that run node todoApi.js

Your server has started at localhost:8081

You can use postman or curl to navigate through different routes defined and then perform all the CRUD operations.
